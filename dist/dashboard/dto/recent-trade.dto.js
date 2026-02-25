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
exports.RecentTradeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecentTradeDto {
    id;
    tradeId;
    walletLabel;
    wallet;
    marketId;
    tokenId;
    slug;
    side;
    size;
    executedSize;
    price;
    status;
    reason;
    createdAt;
    latencyMs;
    fetchLatencyMs;
    executionLatencyMs;
}
exports.RecentTradeDto = RecentTradeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Internal record ID' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Polymarket trade ID' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "tradeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target (leader) username / label' }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "walletLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target proxy wallet address' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Market ID' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "marketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token ID (outcome asset)' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Market/event slug', required: false }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Side', enum: ['BUY', 'SELL'] }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "side", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Leader trade size (decimal string)' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Size we actually executed (for COPIED trades); use this for "my" size', required: false }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "executedSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price (decimal string)' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status', enum: ['PENDING', 'COPIED', 'SKIPPED', 'FAILED'] }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Skip/fail reason', required: false }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at (ISO 8601)' }),
    __metadata("design:type", String)
], RecentTradeDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total latency in ms (leader trade → our execution); only for COPIED', required: false }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "latencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fetch latency: leader trade → we saw it (ms)', required: false }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "fetchLatencyMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Execution latency: we saw it → order sent (ms)', required: false }),
    __metadata("design:type", Object)
], RecentTradeDto.prototype, "executionLatencyMs", void 0);
//# sourceMappingURL=recent-trade.dto.js.map