export declare enum AlertType {
    HIGH_FAIL_RATE = "HIGH_FAIL_RATE",
    LOW_COPY_RATE = "LOW_COPY_RATE",
    NO_RECENT_TRADES = "NO_RECENT_TRADES",
    DEVIATION_FROM_LEADER = "DEVIATION_FROM_LEADER"
}
export declare enum AlertSeverity {
    INFO = "INFO",
    WARNING = "WARNING",
    CRITICAL = "CRITICAL"
}
export declare class PerformanceAlert {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    message: string;
    metadata?: Record<string, unknown>;
    read: boolean;
    createdAt: Date;
}
