declare class WeeklyReportByWalletDto {
    wallet: string;
    label?: string;
    copied: number;
    skipped: number;
    failed: number;
}
export declare class WeeklyReportDto {
    weekStart: string;
    weekEnd: string;
    tradesCopied: number;
    tradesSkipped: number;
    tradesFailed: number;
    totalTrades: number;
    copyRatePercent: number;
    byWallet: WeeklyReportByWalletDto[];
}
export {};
