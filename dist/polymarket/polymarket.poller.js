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
var PolymarketPoller_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolymarketPoller = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const copy_trading_service_1 = require("../copy-trading/copy-trading.service");
const followed_wallets_service_1 = require("../followed-wallets/followed-wallets.service");
const polymarket_service_1 = require("./polymarket.service");
let PolymarketPoller = PolymarketPoller_1 = class PolymarketPoller {
    copyService;
    followedWallets;
    polymarketService;
    logger = new common_1.Logger(PolymarketPoller_1.name);
    constructor(copyService, followedWallets, polymarketService) {
        this.copyService = copyService;
        this.followedWallets = followedWallets;
        this.polymarketService = polymarketService;
    }
    activityTradeId(a) {
        return `${a.timestamp}-${a.transactionHash}-${a.asset}`;
    }
    activityToRawTrade(a, fetchedAt) {
        return {
            id: this.activityTradeId(a),
            marketId: a.conditionId,
            tokenID: a.asset,
            slug: a.slug,
            side: a.side,
            size: a.size,
            price: a.price,
            leaderTradeTimestamp: a.timestamp,
            fetchedAt: fetchedAt.getTime(),
        };
    }
    async onModuleInit() {
        await this.logLatestTradesForTest();
    }
    async logLatestTradesForTest() {
        const wallets = await this.followedWallets.findActive();
        if (wallets.length === 0)
            return;
        const usersDir = (0, path_1.join)(process.cwd(), "users");
        for (const wallet of wallets) {
            const username = (wallet.label ?? wallet.wallet)
                .replace(/^@/, "")
                .replace(/[^a-zA-Z0-9_-]/g, "_");
            const userDir = (0, path_1.join)(usersDir, username);
            try {
                const activity = await this.polymarketService.getActivity(wallet.wallet, 20);
                await (0, promises_1.mkdir)(userDir, { recursive: true });
                const logPath = (0, path_1.join)(userDir, "last_20_trades.log");
                const content = JSON.stringify({
                    username: wallet.label ?? `@${username}`,
                    wallet: wallet.wallet,
                    count: activity.length,
                    activity,
                }, null, 2);
                await (0, promises_1.writeFile)(logPath, content, "utf-8");
                this.logger.log(`Wrote latest ${activity.length} activities (Data API) to ${logPath}`);
            }
            catch (err) {
                this.logger.warn(`Failed to log activity for ${username}: ${err instanceof Error ? err.message : err}`);
            }
        }
    }
    async initializeCursor(wallet, tradeActivities) {
        const hasCursor = wallet.lastTradeId != null &&
            wallet.lastTradeId !== "" &&
            String(wallet.lastTradeId).toLowerCase() !== "null";
        if (hasCursor)
            return;
        if (!tradeActivities?.length)
            return;
        const newestId = this.activityTradeId(tradeActivities[0]);
        if (!newestId || newestId === wallet.id) {
            this.logger.warn(`  Skipping cursor init: no valid trade id`);
            return;
        }
        await this.followedWallets.update(wallet.id, {
            lastTradeId: newestId,
        });
    }
    async pollFollowedUsers() {
        const wallets = await this.followedWallets.findActive();
        for (const wallet of wallets) {
            const walletId = wallet.id;
            const makerAddress = wallet.wallet;
            const label = wallet.label ?? wallet.wallet.slice(0, 10) + "…";
            const activity = await this.polymarketService.getActivity(makerAddress, 100);
            const fetchedAt = new Date();
            const tradesOnly = activity.filter((a) => a.type === "TRADE" && typeof a.asset === "string" && a.asset.length > 0);
            const hasCursor = wallet.lastTradeId != null &&
                wallet.lastTradeId !== "" &&
                String(wallet.lastTradeId).toLowerCase() !== "null";
            if (!hasCursor) {
                await this.initializeCursor(wallet, tradesOnly);
                this.logger.log(`  [${label}] cursor initialized (${tradesOnly.length} TRADE(s) seen)`);
                continue;
            }
            const cursorId = wallet.lastTradeId;
            const newTrades = [];
            for (const a of tradesOnly) {
                if (this.activityTradeId(a) === cursorId)
                    break;
                newTrades.push(a);
            }
            for (const a of newTrades.reverse()) {
                await this.copyService.handleTrade(makerAddress, this.activityToRawTrade(a, fetchedAt));
            }
            if (newTrades.length > 0) {
                const newCursorId = this.activityTradeId(newTrades[0]);
                await this.followedWallets.update(walletId, {
                    lastTradeId: newCursorId,
                });
                this.logger.log(`  [${label}] ${newTrades.length} new TRADE(s) processed, cursor updated`);
            }
        }
    }
};
exports.PolymarketPoller = PolymarketPoller;
__decorate([
    (0, schedule_1.Interval)(1500),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PolymarketPoller.prototype, "pollFollowedUsers", null);
exports.PolymarketPoller = PolymarketPoller = PolymarketPoller_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [copy_trading_service_1.CopyTradingService,
        followed_wallets_service_1.FollowedWalletsService,
        polymarket_service_1.PolymarketService])
], PolymarketPoller);
//# sourceMappingURL=polymarket.poller.js.map