export declare class RecentTradeDto {
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
    status: string;
    reason?: string | null;
    createdAt: string;
    latencyMs?: number | null;
    fetchLatencyMs?: number | null;
    executionLatencyMs?: number | null;
}
