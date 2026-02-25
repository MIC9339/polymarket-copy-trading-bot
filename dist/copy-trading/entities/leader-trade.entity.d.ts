export declare enum TradeStatus {
    PENDING = "PENDING",
    COPIED = "COPIED",
    SKIPPED = "SKIPPED",
    FAILED = "FAILED"
}
export declare class LeaderTrade {
    id: string;
    tradeId: string;
    wallet: string;
    marketId: string;
    tokenId: string;
    slug?: string | null;
    side: 'BUY' | 'SELL';
    size: string;
    price: string;
    status: TradeStatus;
    reason?: string | null;
    leaderTradeAt?: Date | null;
    fetchedAt?: Date | null;
    copiedAt?: Date | null;
    latencyMs?: number | null;
    fetchLatencyMs?: number | null;
    executionLatencyMs?: number | null;
    executedSize?: string | null;
    createdAt: Date;
}
