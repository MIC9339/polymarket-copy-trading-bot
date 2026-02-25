export declare class DashboardStatsDto {
    walletsCount: number;
    activeWalletsCount: number;
    positionsCount: number;
    tradesCopied: number;
    tradesCopiedLast7Days: number;
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
}
