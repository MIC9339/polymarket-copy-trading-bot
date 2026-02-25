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
exports.ComparativeAnalysisDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BotSummaryDto {
    totalCopied;
    totalSkipped;
    totalFailed;
    copyRatePercent;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BotSummaryDto.prototype, "totalCopied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BotSummaryDto.prototype, "totalSkipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BotSummaryDto.prototype, "totalFailed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overall copy rate %' }),
    __metadata("design:type", Number)
], BotSummaryDto.prototype, "copyRatePercent", void 0);
class LeaderComparisonDto {
    wallet;
    label;
    copied;
    skipped;
    failed;
    totalSignals;
    copyRatePercent;
    failRatePercent;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderComparisonDto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LeaderComparisonDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LeaderComparisonDto.prototype, "copied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LeaderComparisonDto.prototype, "skipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LeaderComparisonDto.prototype, "failed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total signals from this leader' }),
    __metadata("design:type", Number)
], LeaderComparisonDto.prototype, "totalSignals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Copy rate % for this leader' }),
    __metadata("design:type", Number)
], LeaderComparisonDto.prototype, "copyRatePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fail rate % for this leader' }),
    __metadata("design:type", Number)
], LeaderComparisonDto.prototype, "failRatePercent", void 0);
class ComparativeAnalysisDto {
    bot;
    leaders;
}
exports.ComparativeAnalysisDto = ComparativeAnalysisDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: BotSummaryDto, description: 'Bot aggregate stats' }),
    __metadata("design:type", BotSummaryDto)
], ComparativeAnalysisDto.prototype, "bot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LeaderComparisonDto], description: 'Per-leader comparison' }),
    __metadata("design:type", Array)
], ComparativeAnalysisDto.prototype, "leaders", void 0);
//# sourceMappingURL=comparative-analysis.dto.js.map