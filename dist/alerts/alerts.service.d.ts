import { PerformanceAlert } from './entities/performance-alert.entity';
import { DashboardService } from '../dashboard/dashboard.service';
export declare class AlertsService {
    private readonly dashboard;
    private readonly logger;
    private readonly store;
    constructor(dashboard: DashboardService);
    evaluatePerformanceAlerts(): Promise<void>;
    private createAlertIfNotExists;
    findAll(unreadOnly?: boolean): Promise<PerformanceAlert[]>;
    markAsRead(id: string): Promise<PerformanceAlert>;
    markAllAsRead(): Promise<{
        count: number;
    }>;
}
