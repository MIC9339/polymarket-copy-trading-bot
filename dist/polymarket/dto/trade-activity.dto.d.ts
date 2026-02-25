export declare class TradeActivityItemDto {
    id: string;
    marketId: string;
    tokenID: string;
    side: 'BUY' | 'SELL';
    size: number;
    price: number;
    timestamp?: string;
}
export declare class TradeActivityResponseDto {
    trades: TradeActivityItemDto[];
}
