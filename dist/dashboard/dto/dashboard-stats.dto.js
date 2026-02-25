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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DashboardStatsDto {
    walletsCount;
    activeWalletsCount;
    positionsCount;
    tradesCopied;
    tradesCopiedLast7Days;
    tradesSkipped;
    tradesFailed;
    tradesPending;
    totalTrades;
    copyRatePercent;
    failRatePercent;
    lastCopyLatencyMs;
    avgCopyLatencyMs;
    lastFetchLatencyMs;
    lastExecutionLatencyMs;
    avgFetchLatencyMs;
    avgExecutionLatencyMs;
}
exports.DashboardStatsDto = DashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of followed wallets', example: 5 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "walletsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of active (enabled) followers', example: 4 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "activeWalletsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of bot positions', example: 12 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "positionsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades successfully copied (all time)', example: 42 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "tradesCopied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades copied in the last 7 days (closer to portfolio activity)', example: 8 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "tradesCopiedLast7Days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades skipped by strategy', example: 8 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "tradesSkipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades that failed to execute', example: 2 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "tradesFailed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades pending execution', example: 0 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "tradesPending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total leader trades processed', example: 52 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalTrades", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Copy rate percentage (0–100)', example: 80.77 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "copyRatePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fail rate percentage (0–100)', example: 3.85 }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "failRatePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total latency in ms of the last successfully copied trade', required: false }),
    __metadata("design:type", Object)
], DashboardStatsDto.prototype, "lastCopyLatencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average total copy latency in ms (copied trades only)', required: false }),
    __metadata("design:type", Object)
], DashboardStatsDto.prototype, "avgCopyLatencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last fetch latency (leader trade → we saw it) in ms', required: false }),
    __metadata("design:type", Object)
], DashboardStatsDto.prototype, "lastFetchLatencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last execution latency (we saw it → order sent) in ms', required: false }),
    __metadata("design:type", Object)
], DashboardStatsDto.prototype, "lastExecutionLatencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average fetch latency in ms', required: false }),
    __metadata("design:type", Object)
], DashboardStatsDto.prototype, "avgFetchLatencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average execution latency in ms', required: false }),
    __metadata("design:type", Object)
], DashboardStatsDto.prototype, "avgExecutionLatencyMs", void 0);
//# sourceMappingURL=dashboard-stats.dto.js.map