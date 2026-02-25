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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const leader_trade_entity_1 = require("../copy-trading/entities/leader-trade.entity");
const date_fns_2 = require("date-fns");
const copy_trading_service_1 = require("../copy-trading/copy-trading.service");
const followed_wallets_service_1 = require("../followed-wallets/followed-wallets.service");
let DashboardService = class DashboardService {
    static { DashboardService_1 = this; }
    copyTrading;
    wallets;
    constructor(copyTrading, wallets) {
        this.copyTrading = copyTrading;
        this.wallets = wallets;
    }
    async getStats() {
        const since7DaysAgo = (0, date_fns_1.subDays)(new Date(), 7);
        const [allWallets, activeWallets, trades, positions, latencyStats] = await Promise.all([
            this.wallets.findAll(),
            this.wallets.findActive(),
            Promise.resolve(this.copyTrading.getLeaderTrades()),
            Promise.resolve(this.copyTrading.getBotPositions()),
            this.getCopyLatencyStats(),
        ]);
        const copied = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED).length;
        const copiedLast7Days = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED && t.createdAt >= since7DaysAgo).length;
        const skipped = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.SKIPPED).length;
        const failed = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.FAILED).length;
        const pending = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.PENDING).length;
        const totalTrades = copied + skipped + failed + pending;
        const copyRatePercent = totalTrades > 0 ? (copied / totalTrades) * 100 : 0;
        const failRatePercent = totalTrades > 0 ? (failed / totalTrades) * 100 : 0;
        return {
            walletsCount: allWallets.length,
            activeWalletsCount: activeWallets.length,
            positionsCount: positions.length,
            tradesCopied: copied,
            tradesCopiedLast7Days: copiedLast7Days,
            tradesSkipped: skipped,
            tradesFailed: failed,
            tradesPending: pending,
            totalTrades,
            copyRatePercent: Math.round(copyRatePercent * 100) / 100,
            failRatePercent: Math.round(failRatePercent * 100) / 100,
            lastCopyLatencyMs: latencyStats?.lastCopyLatencyMs ?? null,
            avgCopyLatencyMs: latencyStats?.avgCopyLatencyMs ?? null,
            lastFetchLatencyMs: latencyStats?.lastFetchLatencyMs ?? null,
            lastExecutionLatencyMs: latencyStats?.lastExecutionLatencyMs ?? null,
            avgFetchLatencyMs: latencyStats?.avgFetchLatencyMs ?? null,
            avgExecutionLatencyMs: latencyStats?.avgExecutionLatencyMs ?? null,
        };
    }
    static AVG_EXEC_RECENT_LIMIT = 50;
    async getCopyLatencyStats() {
        const trades = this.copyTrading
            .getLeaderTrades()
            .filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED);
        const sortedByCopied = [...trades].sort((a, b) => (b.copiedAt?.getTime() ?? 0) - (a.copiedAt?.getTime() ?? 0));
        const lastTrade = sortedByCopied[0] ?? null;
        const withLatency = trades.filter((t) => t.latencyMs != null);
        const withFetch = trades.filter((t) => t.fetchLatencyMs != null);
        const withExecution = trades.filter((t) => t.executionLatencyMs != null);
        const recentWithExec = sortedByCopied
            .slice(0, DashboardService_1.AVG_EXEC_RECENT_LIMIT)
            .filter((t) => t.executionLatencyMs != null);
        if (withLatency.length === 0) {
            return {
                lastCopyLatencyMs: lastTrade?.latencyMs ?? null,
                avgCopyLatencyMs: null,
                lastFetchLatencyMs: lastTrade?.fetchLatencyMs ?? null,
                lastExecutionLatencyMs: lastTrade?.executionLatencyMs ?? null,
                avgFetchLatencyMs: null,
                avgExecutionLatencyMs: recentWithExec.length > 0
                    ? Math.round(recentWithExec.reduce((s, t) => s + (t.executionLatencyMs ?? 0), 0) /
                        recentWithExec.length)
                    : null,
            };
        }
        return {
            lastCopyLatencyMs: lastTrade?.latencyMs ?? null,
            avgCopyLatencyMs: Math.round(withLatency.reduce((s, t) => s + (t.latencyMs ?? 0), 0) / withLatency.length),
            lastFetchLatencyMs: lastTrade?.fetchLatencyMs ?? null,
            lastExecutionLatencyMs: lastTrade?.executionLatencyMs ?? null,
            avgFetchLatencyMs: withFetch.length > 0
                ? Math.round(withFetch.reduce((s, t) => s + (t.fetchLatencyMs ?? 0), 0) / withFetch.length)
                : null,
            avgExecutionLatencyMs: recentWithExec.length > 0
                ? Math.round(recentWithExec.reduce((s, t) => s + (t.executionLatencyMs ?? 0), 0) /
                    recentWithExec.length)
                : withExecution.length > 0
                    ? Math.round(withExecution.reduce((s, t) => s + (t.executionLatencyMs ?? 0), 0) /
                        withExecution.length)
                    : null,
        };
    }
    async getRecentTrades(limit = 20, onlyCopied = false) {
        const wallets = await this.wallets.findAll();
        const walletLabels = new Map(wallets.map((w) => [w.wallet, w.label]));
        let trades = this.copyTrading.getLeaderTrades();
        if (onlyCopied)
            trades = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED);
        trades = [...trades].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        trades = trades.slice(0, limit);
        return trades.map((t) => ({
            id: t.id,
            tradeId: t.tradeId,
            walletLabel: walletLabels.get(t.wallet) ?? null,
            wallet: t.wallet,
            marketId: t.marketId,
            tokenId: t.tokenId,
            slug: t.slug ?? undefined,
            side: t.side,
            size: t.size,
            executedSize: t.executedSize ?? undefined,
            price: t.price,
            status: t.status,
            reason: t.reason ?? undefined,
            createdAt: (t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt)).toISOString(),
            latencyMs: t.latencyMs ?? undefined,
            fetchLatencyMs: t.fetchLatencyMs ?? undefined,
            executionLatencyMs: t.executionLatencyMs ?? undefined,
        }));
    }
    async getWeeklyReports(weeks = 12) {
        const wallets = await this.wallets.findAll();
        const walletLabels = new Map(wallets.map((w) => [w.wallet, w.label]));
        const allTrades = this.copyTrading.getLeaderTrades();
        const reports = [];
        const now = new Date();
        for (let i = 0; i < weeks; i++) {
            const weekStart = (0, date_fns_2.startOfWeek)((0, date_fns_2.subWeeks)(now, i), { weekStartsOn: 1 });
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            const trades = allTrades.filter((t) => {
                const created = t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt);
                return created >= weekStart && created <= weekEnd;
            });
            const copied = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED).length;
            const skipped = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.SKIPPED).length;
            const failed = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.FAILED).length;
            const total = trades.length;
            const copyRatePercent = total > 0 ? (copied / total) * 100 : 0;
            const byWalletMap = new Map();
            for (const t of trades) {
                if (!byWalletMap.has(t.wallet)) {
                    byWalletMap.set(t.wallet, { copied: 0, skipped: 0, failed: 0 });
                }
                const row = byWalletMap.get(t.wallet);
                if (t.status === leader_trade_entity_1.TradeStatus.COPIED)
                    row.copied++;
                else if (t.status === leader_trade_entity_1.TradeStatus.SKIPPED)
                    row.skipped++;
                else if (t.status === leader_trade_entity_1.TradeStatus.FAILED)
                    row.failed++;
            }
            const byWallet = Array.from(byWalletMap.entries()).map(([wallet, counts]) => ({
                wallet,
                label: walletLabels.get(wallet),
                ...counts,
            }));
            reports.push({
                weekStart: (0, date_fns_2.format)(weekStart, 'yyyy-MM-dd'),
                weekEnd: (0, date_fns_2.format)(weekEnd, 'yyyy-MM-dd'),
                tradesCopied: copied,
                tradesSkipped: skipped,
                tradesFailed: failed,
                totalTrades: total,
                copyRatePercent: Math.round(copyRatePercent * 100) / 100,
                byWallet,
            });
        }
        return reports;
    }
    async getComparativeAnalysis() {
        const wallets = await this.wallets.findAll();
        const walletLabels = new Map(wallets.map((w) => [w.wallet, w.label]));
        const trades = this.copyTrading.getLeaderTrades();
        const bot = {
            totalCopied: trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED).length,
            totalSkipped: trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.SKIPPED).length,
            totalFailed: trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.FAILED).length,
        };
        const total = bot.totalCopied + bot.totalSkipped + bot.totalFailed;
        const copyRatePercent = total > 0 ? (bot.totalCopied / total) * 100 : 0;
        const byWallet = new Map();
        for (const t of trades) {
            if (!byWallet.has(t.wallet)) {
                byWallet.set(t.wallet, { copied: 0, skipped: 0, failed: 0 });
            }
            const row = byWallet.get(t.wallet);
            if (t.status === leader_trade_entity_1.TradeStatus.COPIED)
                row.copied++;
            else if (t.status === leader_trade_entity_1.TradeStatus.SKIPPED)
                row.skipped++;
            else if (t.status === leader_trade_entity_1.TradeStatus.FAILED)
                row.failed++;
        }
        const leaders = Array.from(byWallet.entries()).map(([wallet, counts]) => {
            const totalSignals = counts.copied + counts.skipped + counts.failed;
            return {
                wallet,
                label: walletLabels.get(wallet),
                copied: counts.copied,
                skipped: counts.skipped,
                failed: counts.failed,
                totalSignals,
                copyRatePercent: totalSignals > 0 ? Math.round((counts.copied / totalSignals) * 10000) / 100 : 0,
                failRatePercent: totalSignals > 0 ? Math.round((counts.failed / totalSignals) * 10000) / 100 : 0,
            };
        });
        return {
            bot: { ...bot, copyRatePercent: Math.round(copyRatePercent * 100) / 100 },
            leaders: leaders.sort((a, b) => b.totalSignals - a.totalSignals),
        };
    }
    async getStatsForAlerts() {
        const trades = this.copyTrading.getLeaderTrades();
        const total = trades.length;
        const copied = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.COPIED).length;
        const failed = trades.filter((t) => t.status === leader_trade_entity_1.TradeStatus.FAILED).length;
        const dates = trades.map((t) => (t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt)).getTime());
        const lastTradeAt = dates.length ? new Date(Math.max(...dates)) : null;
        return { total, copied, failed, lastTradeAt };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [copy_trading_service_1.CopyTradingService,
        followed_wallets_service_1.FollowedWalletsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map