"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AlertsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const performance_alert_entity_1 = require("./entities/performance-alert.entity");
const dashboard_service_1 = require("../dashboard/dashboard.service");
const FAIL_RATE_THRESHOLD_PERCENT = 15;
const COPY_RATE_LOW_THRESHOLD_PERCENT = 40;
const NO_TRADES_HOURS = 24;
let AlertsService = AlertsService_1 = class AlertsService {
    dashboard;
    logger = new common_1.Logger(AlertsService_1.name);
    store = [];
    constructor(dashboard) {
        this.dashboard = dashboard;
    }
    async evaluatePerformanceAlerts() {
        try {
            const stats = await this.dashboard.getStatsForAlerts();
            const { total, copied, failed, lastTradeAt } = stats;
            if (total === 0) {
                await this.createAlertIfNotExists(performance_alert_entity_1.AlertType.NO_RECENT_TRADES, performance_alert_entity_1.AlertSeverity.INFO, {
                    message: 'No trades recorded yet. Add followed wallets to start copy trading.',
                });
                return;
            }
            const failRatePercent = (failed / total) * 100;
            const copyRatePercent = (copied / total) * 100;
            if (failRatePercent >= FAIL_RATE_THRESHOLD_PERCENT) {
                await this.createAlertIfNotExists(performance_alert_entity_1.AlertType.HIGH_FAIL_RATE, performance_alert_entity_1.AlertSeverity.CRITICAL, {
                    message: `Fail rate is ${failRatePercent.toFixed(1)}% (threshold: ${FAIL_RATE_THRESHOLD_PERCENT}%). Check execution and API.`,
                    failRatePercent,
                    failed,
                    total,
                });
            }
            if (copyRatePercent <= COPY_RATE_LOW_THRESHOLD_PERCENT && total >= 10) {
                await this.createAlertIfNotExists(performance_alert_entity_1.AlertType.LOW_COPY_RATE, performance_alert_entity_1.AlertSeverity.WARNING, {
                    message: `Copy rate is ${copyRatePercent.toFixed(1)}% (below ${COPY_RATE_LOW_THRESHOLD_PERCENT}%). Many trades are being skipped.`,
                    copyRatePercent,
                    copied,
                    total,
                });
            }
            if (lastTradeAt) {
                const hoursSinceLastTrade = (Date.now() - lastTradeAt.getTime()) / (1000 * 60 * 60);
                if (hoursSinceLastTrade >= NO_TRADES_HOURS) {
                    await this.createAlertIfNotExists(performance_alert_entity_1.AlertType.NO_RECENT_TRADES, performance_alert_entity_1.AlertSeverity.WARNING, {
                        message: `No new trades in the last ${Math.floor(hoursSinceLastTrade)} hours. Leaders may be inactive.`,
                        lastTradeAt: lastTradeAt.toISOString(),
                    });
                }
            }
        }
        catch (err) {
            this.logger.warn('Failed to evaluate performance alerts', err instanceof Error ? err.message : err);
        }
    }
    async createAlertIfNotExists(type, severity, payload) {
        const recent = this.store
            .filter((a) => a.type === type && !a.read)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        if (recent) {
            const ageHours = (Date.now() - new Date(recent.createdAt).getTime()) / (1000 * 60 * 60);
            if (ageHours < 2)
                return;
        }
        const alert = {
            id: crypto.randomUUID(),
            type,
            severity,
            message: payload.message,
            metadata: payload,
            read: false,
            createdAt: new Date(),
        };
        this.store.push(alert);
        this.logger.log(`Alert created: ${type} - ${payload.message}`);
    }
    async findAll(unreadOnly = false) {
        let list = [...this.store].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (unreadOnly)
            list = list.filter((a) => !a.read);
        return list.slice(0, 100);
    }
    async markAsRead(id) {
        const alert = this.store.find((a) => a.id === id);
        if (!alert)
            throw new Error('Alert not found');
        alert.read = true;
        return alert;
    }
    async markAllAsRead() {
        const count = this.store.filter((a) => !a.read).length;
        this.store.forEach((a) => (a.read = true));
        return { count };
    }
};
exports.AlertsService = AlertsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsService.prototype, "evaluatePerformanceAlerts", null);
exports.AlertsService = AlertsService = AlertsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map