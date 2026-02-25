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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_stats_dto_1 = require("./dto/dashboard-stats.dto");
const recent_trade_dto_1 = require("./dto/recent-trade.dto");
const weekly_report_dto_1 = require("./dto/weekly-report.dto");
const comparative_analysis_dto_1 = require("./dto/comparative-analysis.dto");
let DashboardController = class DashboardController {
    dashboard;
    constructor(dashboard) {
        this.dashboard = dashboard;
    }
    async getStats() {
        return this.dashboard.getStats();
    }
    async getRecentTrades(limit, onlyCopied) {
        const limitNum = limit ? Math.min(100, Math.max(1, parseInt(limit, 10) || 20)) : 20;
        const onlyCopiedBool = onlyCopied === 'true' || onlyCopied === '1';
        return this.dashboard.getRecentTrades(limitNum, onlyCopiedBool);
    }
    async getWeeklyReports(weeks) {
        const weeksNum = weeks ? Math.min(52, Math.max(1, parseInt(weeks, 10) || 12)) : 12;
        return this.dashboard.getWeeklyReports(weeksNum);
    }
    async getComparativeAnalysis() {
        return this.dashboard.getComparativeAnalysis();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Real-time dashboard stats' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard statistics (followers, positions, trades by status, copy/fail rates)', type: dashboard_stats_dto_1.DashboardStatsDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('recent-trades'),
    (0, swagger_1.ApiOperation)({ summary: 'Recent trades (optionally only copied / my trades)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Max number of trades (1–100, default 20)' }),
    (0, swagger_1.ApiQuery)({ name: 'onlyCopied', required: false, type: Boolean, description: 'If true, return only COPIED trades (my copy executions)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of recent trades', type: [recent_trade_dto_1.RecentTradeDto] }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('onlyCopied')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentTrades", null);
__decorate([
    (0, common_1.Get)('reports/weekly'),
    (0, swagger_1.ApiOperation)({ summary: 'Weekly performance reports' }),
    (0, swagger_1.ApiQuery)({ name: 'weeks', required: false, type: Number, description: 'Number of weeks to return (1–52, default 12)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Weekly aggregated reports with per-wallet breakdown', type: [weekly_report_dto_1.WeeklyReportDto] }),
    __param(0, (0, common_1.Query)('weeks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getWeeklyReports", null);
__decorate([
    (0, common_1.Get)('analysis/compare'),
    (0, swagger_1.ApiOperation)({ summary: 'Comparative analysis: bot vs copied traders (leaders)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bot aggregate and per-leader copy/skip/fail stats', type: comparative_analysis_dto_1.ComparativeAnalysisDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getComparativeAnalysis", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map