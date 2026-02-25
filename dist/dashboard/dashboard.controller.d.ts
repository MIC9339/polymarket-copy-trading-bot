import { DashboardService, DashboardStats, RecentTradeDto as RecentTradeServiceDto, WeeklyReportDto as WeeklyReportServiceDto, ComparativeAnalysisDto as ComparativeAnalysisServiceDto } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboard;
    constructor(dashboard: DashboardService);
    getStats(): Promise<DashboardStats>;
    getRecentTrades(limit?: string, onlyCopied?: string): Promise<RecentTradeServiceDto[]>;
    getWeeklyReports(weeks?: string): Promise<WeeklyReportServiceDto[]>;
    getComparativeAnalysis(): Promise<ComparativeAnalysisServiceDto>;
}
