"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CopyTradingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyTradingService = void 0;
const common_1 = require("@nestjs/common");
const polymarket_client_1 = require("../clients/polymarket.client");
const copy_trading_strategy_1 = require("./copy-trading.strategy");
const leader_trade_entity_1 = require("./entities/leader-trade.entity");
let CopyTradingService = CopyTradingService_1 = class CopyTradingService {
    polyClient;
    strategy;
    logger = new common_1.Logger(CopyTradingService_1.name);
    leaderTrades = [];
    botPositions = [];
    constructor(polyClient, strategy) {
        this.polyClient = polyClient;
        this.strategy = strategy;
    }
    getLeaderTrades() {
        return [...this.leaderTrades];
    }
    getBotPositions() {
        return [...this.botPositions];
    }
    async handleTrade(sourceWallet, rawTrade) {
        const tradeId = rawTrade?.id;
        try {
            if (await this.tradeExists(tradeId)) {
                return;
            }
            const trade = this.normalizeTrade(rawTrade);
            const leaderNetChange = trade.side === 'BUY' ? trade.size : -trade.size;
            const botCurrentPosition = await this.getBotPosition(trade.marketId, trade.tokenID);
            const decision = this.strategy.decide({
                leaderNetChange,
                botCurrentPosition,
                trade,
            });
            await this.saveTrade(trade, sourceWallet, {
                status: decision.shouldTrade
                    ? leader_trade_entity_1.TradeStatus.PENDING
                    : leader_trade_entity_1.TradeStatus.SKIPPED,
                reason: decision.reason,
            });
            if (!decision.shouldTrade) {
                this.logger.debug(`Skip trade ${trade.tradeId}: ${decision.reason}`);
                return;
            }
            const executedAt = new Date();
            await this.executeTrade(trade, decision.side, decision.size);
            await this.updateBotPosition(trade, decision.side, decision.size);
            const leaderTradeAt = this.toLeaderTradeAt(trade.leaderTradeTimestamp);
            const fetchedAt = trade.fetchedAt;
            const latencyMs = leaderTradeAt
                ? Math.round(executedAt.getTime() - leaderTradeAt.getTime())
                : null;
            const fetchLatencyMs = leaderTradeAt && fetchedAt
                ? Math.round(fetchedAt.getTime() - leaderTradeAt.getTime())
                : null;
            const executionLatencyMs = fetchedAt ? Math.round(executedAt.getTime() - fetchedAt.getTime()) : null;
            await this.updateTradeStatus(trade.tradeId, leader_trade_entity_1.TradeStatus.COPIED, undefined, {
                copiedAt: executedAt,
                latencyMs: latencyMs ?? undefined,
                fetchLatencyMs: fetchLatencyMs ?? undefined,
                executionLatencyMs: executionLatencyMs ?? undefined,
                executedSize: decision.size.toString(),
            });
            if (latencyMs != null) {
                this.logger.log(`Copy trade ${trade.tradeId} latency: ${latencyMs} ms (fetch: ${fetchLatencyMs ?? '—'} ms, execution: ${executionLatencyMs ?? '—'} ms)`);
            }
        }
        catch (err) {
            this.logger.error(`Failed handling trade ${tradeId} from ${sourceWallet}`, err instanceof Error ? err.stack : undefined);
            if (tradeId) {
                await this.updateTradeStatus(tradeId, leader_trade_entity_1.TradeStatus.FAILED, err?.message);
            }
        }
    }
    async tradeExists(tradeId) {
        if (!tradeId)
            return true;
        return this.leaderTrades.some((t) => t.tradeId === tradeId);
    }
    toLeaderTradeAt(ts) {
        if (ts == null || Number.isNaN(ts))
            return null;
        const ms = ts < 1e12 ? ts * 1000 : ts;
        return new Date(ms);
    }
    async saveTrade(trade, sourceWallet, meta) {
        if (this.leaderTrades.some((t) => t.tradeId === trade.tradeId))
            return;
        const leaderTradeAt = this.toLeaderTradeAt(trade.leaderTradeTimestamp);
        const entity = {
            id: crypto.randomUUID(),
            tradeId: trade.tradeId,
            wallet: sourceWallet,
            marketId: trade.marketId,
            tokenId: trade.tokenID,
            slug: trade.slug ?? undefined,
            side: trade.side,
            size: trade.size.toString(),
            price: trade.price.toString(),
            status: meta?.status ?? leader_trade_entity_1.TradeStatus.PENDING,
            reason: meta?.reason,
            leaderTradeAt: leaderTradeAt ?? undefined,
            fetchedAt: trade.fetchedAt ?? undefined,
            createdAt: new Date(),
        };
        this.leaderTrades.push(entity);
    }
    async updateTradeStatus(tradeId, status, reason, extra) {
        const t = this.leaderTrades.find((x) => x.tradeId === tradeId);
        if (t) {
            t.status = status;
            if (reason !== undefined)
                t.reason = reason;
            if (extra)
                Object.assign(t, extra);
        }
    }
    async getBotPosition(marketId, tokenId) {
        const botPos = this.botPositions.find((p) => p.marketId === marketId && p.tokenId === tokenId);
        return botPos ? Number(botPos.netSize) : 0;
    }
    async updateBotPosition(trade, side, size) {
        let botPos = this.botPositions.find((p) => p.marketId === trade.marketId && p.tokenId === trade.tokenID);
        if (!botPos) {
            botPos = {
                id: crypto.randomUUID(),
                marketId: trade.marketId,
                tokenId: trade.tokenID,
                netSize: '0',
                updatedAt: new Date(),
            };
            this.botPositions.push(botPos);
        }
        const delta = side === 'BUY' ? size : -size;
        botPos.netSize = (Number(botPos.netSize) + delta).toString();
        botPos.updatedAt = new Date();
    }
    normalizeTrade(raw) {
        return {
            tradeId: raw.id,
            marketId: raw.market_id ?? raw.marketId,
            tokenID: raw.tokenID ?? raw.market_token_id,
            slug: typeof raw.slug === 'string' ? raw.slug : undefined,
            side: raw.side,
            size: Number(raw.size),
            price: Number(raw.price),
            leaderTradeTimestamp: raw.leaderTradeTimestamp != null ? Number(raw.leaderTradeTimestamp) : undefined,
            fetchedAt: raw.fetchedAt != null ? new Date(Number(raw.fetchedAt)) : undefined,
        };
    }
    async executeTrade(trade, side, size) {
        const client = await this.polyClient.getClient();
        if (!trade.tokenID) {
            throw new Error('Missing tokenID');
        }
        this.logger.log(`Executing ${side} ${size} @ ${trade.price} (${trade.tokenID})`);
        await client.createAndPostOrder({
            tokenID: trade.tokenID,
            side,
            price: trade.price,
            size,
        }, {
            tickSize: '0.01',
            negRisk: false,
        });
    }
};
exports.CopyTradingService = CopyTradingService;
exports.CopyTradingService = CopyTradingService = CopyTradingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [polymarket_client_1.PolymarketClient,
        copy_trading_strategy_1.CopyTradingStrategy])
], CopyTradingService);
//# sourceMappingURL=copy-trading.service.js.map