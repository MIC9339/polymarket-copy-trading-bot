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
exports.TradeActivityResponseDto = exports.TradeActivityItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TradeActivityItemDto {
    id;
    marketId;
    tokenID;
    side;
    size;
    price;
    timestamp;
}
exports.TradeActivityItemDto = TradeActivityItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trade ID' }),
    __metadata("design:type", String)
], TradeActivityItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Market ID' }),
    __metadata("design:type", String)
], TradeActivityItemDto.prototype, "marketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Market token ID' }),
    __metadata("design:type", String)
], TradeActivityItemDto.prototype, "tokenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Side', enum: ['BUY', 'SELL'] }),
    __metadata("design:type", String)
], TradeActivityItemDto.prototype, "side", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Size' }),
    __metadata("design:type", Number)
], TradeActivityItemDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price' }),
    __metadata("design:type", Number)
], TradeActivityItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trade timestamp (ISO)', required: false }),
    __metadata("design:type", String)
], TradeActivityItemDto.prototype, "timestamp", void 0);
class TradeActivityResponseDto {
    trades;
}
exports.TradeActivityResponseDto = TradeActivityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TradeActivityItemDto], description: 'Trades for the given wallet address' }),
    __metadata("design:type", Array)
], TradeActivityResponseDto.prototype, "trades", void 0);
//# sourceMappingURL=trade-activity.dto.js.map