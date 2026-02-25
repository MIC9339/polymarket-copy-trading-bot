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
exports.WeeklyReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class WeeklyReportByWalletDto {
    wallet;
    label;
    copied;
    skipped;
    failed;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WeeklyReportByWalletDto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], WeeklyReportByWalletDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], WeeklyReportByWalletDto.prototype, "copied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], WeeklyReportByWalletDto.prototype, "skipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], WeeklyReportByWalletDto.prototype, "failed", void 0);
class WeeklyReportDto {
    weekStart;
    weekEnd;
    tradesCopied;
    tradesSkipped;
    tradesFailed;
    totalTrades;
    copyRatePercent;
    byWallet;
}
exports.WeeklyReportDto = WeeklyReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Week start date (YYYY-MM-DD)', example: '2025-01-27' }),
    __metadata("design:type", String)
], WeeklyReportDto.prototype, "weekStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Week end date (YYYY-MM-DD)', example: '2025-02-02' }),
    __metadata("design:type", String)
], WeeklyReportDto.prototype, "weekEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades copied in the week', example: 15 }),
    __metadata("design:type", Number)
], WeeklyReportDto.prototype, "tradesCopied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades skipped in the week', example: 3 }),
    __metadata("design:type", Number)
], WeeklyReportDto.prototype, "tradesSkipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trades failed in the week', example: 1 }),
    __metadata("design:type", Number)
], WeeklyReportDto.prototype, "tradesFailed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total trades in the week', example: 19 }),
    __metadata("design:type", Number)
], WeeklyReportDto.prototype, "totalTrades", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Copy rate percentage for the week', example: 78.95 }),
    __metadata("design:type", Number)
], WeeklyReportDto.prototype, "copyRatePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WeeklyReportByWalletDto], description: 'Breakdown by leader wallet' }),
    __metadata("design:type", Array)
], WeeklyReportDto.prototype, "byWallet", void 0);
//# sourceMappingURL=weekly-report.dto.js.map