declare class BotSummaryDto {
    totalCopied: number;
    totalSkipped: number;
    totalFailed: number;
    copyRatePercent: number;
}
declare class LeaderComparisonDto {
    wallet: string;
    label?: string;
    copied: number;
    skipped: number;
    failed: number;
    totalSignals: number;
    copyRatePercent: number;
    failRatePercent: number;
}
export declare class ComparativeAnalysisDto {
    bot: BotSummaryDto;
    leaders: LeaderComparisonDto[];
}
export {};
