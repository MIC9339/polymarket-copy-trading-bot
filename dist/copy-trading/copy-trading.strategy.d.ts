export interface NormalizedTrade {
    tradeId: string;
    marketId: string;
    tokenID: string;
    slug?: string;
    side: 'BUY' | 'SELL';
    size: number;
    price: number;
    leaderTradeTimestamp?: number;
    fetchedAt?: Date;
}
export interface StrategyDecision {
    shouldTrade: boolean;
    side?: 'BUY' | 'SELL';
    size?: number;
    reason: string;
}
export declare class CopyTradingStrategy {
    private readonly MIN_EXECUTABLE_SIZE;
    private readonly MIN_SIGNAL_SIZE;
    private readonly MAX_POSITION_SIZE;
    decide(params: {
        leaderNetChange: number;
        botCurrentPosition: number;
        trade: NormalizedTrade;
    }): StrategyDecision;
}
