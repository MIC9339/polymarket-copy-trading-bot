import { TradeStatus } from '../copy-trading/entities/leader-trade.entity';
import { CopyTradingService } from '../copy-trading/copy-trading.service';
import { FollowedWalletsService } from '../followed-wallets/followed-wallets.service';
export interface DashboardStats {
    walletsCount: number;
    activeWalletsCount: number;
    positionsCount: number;
    tradesCopied: number;
    tradesSkipped: number;
    tradesFailed: number;
    tradesPending: number;
    totalTrades: number;
    copyRatePercent: number;
    failRatePercent: number;
    lastCopyLatencyMs?: number | null;
    avgCopyLatencyMs?: number | null;
    lastFetchLatencyMs?: number | null;
    lastExecutionLatencyMs?: number | null;
    avgFetchLatencyMs?: number | null;
    avgExecutionLatencyMs?: number | null;
    tradesCopiedLast7Days: number;
}
export interface RecentTradeDto {
    id: string;
    tradeId: string;
    walletLabel: string | null;
    wallet: string;
    marketId: string;
    tokenId: string;
    slug?: string | null;
    side: string;
    size: string;
    executedSize?: string | null;
    price: string;
    status: TradeStatus;
    reason?: string | null;
    createdAt: string;
    latencyMs?: number | null;
    fetchLatencyMs?: number | null;
    executionLatencyMs?: number | null;
}
export interface WeeklyReportDto {
    weekStart: string;
    weekEnd: string;
    tradesCopied: number;
    tradesSkipped: number;
    tradesFailed: number;
    totalTrades: number;
    copyRatePercent: number;
    byWallet: {
        wallet: string;
        label?: string;
        copied: number;
        skipped: number;
        failed: number;
    }[];
}
export interface LeaderComparisonDto {
    wallet: string;
    label?: string;
    copied: number;
    skipped: number;
    failed: number;
    totalSignals: number;
    copyRatePercent: number;
    failRatePercent: number;
}
export interface ComparativeAnalysisDto {
    bot: {
        totalCopied: number;
        totalSkipped: number;
        totalFailed: number;
        copyRatePercent: number;
    };
    leaders: LeaderComparisonDto[];
}
export declare class DashboardService {
    private readonly copyTrading;
    private readonly wallets;
    constructor(copyTrading: CopyTradingService, wallets: FollowedWalletsService);
    getStats(): Promise<DashboardStats>;
    private static readonly AVG_EXEC_RECENT_LIMIT;
    private getCopyLatencyStats;
    getRecentTrades(limit?: number, onlyCopied?: boolean): Promise<RecentTradeDto[]>;
    getWeeklyReports(weeks?: number): Promise<WeeklyReportDto[]>;
    getComparativeAnalysis(): Promise<ComparativeAnalysisDto>;
    getStatsForAlerts(): Promise<{
        total: number;
        copied: number;
        failed: number;
        lastTradeAt: Date | null;
    }>;
}
