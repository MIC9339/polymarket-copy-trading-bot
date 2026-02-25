import { AlertsService } from './alerts.service';
import { PerformanceAlert } from './entities/performance-alert.entity';
export declare class AlertsController {
    private readonly alerts;
    constructor(alerts: AlertsService);
    list(unreadOnly?: string): Promise<PerformanceAlert[]>;
    markAllAsRead(): Promise<{
        count: number;
    }>;
    markAsRead(id: string): Promise<PerformanceAlert>;
}
