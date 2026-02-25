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
exports.LeaderTrade = exports.TradeStatus = void 0;
const typeorm_1 = require("typeorm");
var TradeStatus;
(function (TradeStatus) {
    TradeStatus["PENDING"] = "PENDING";
    TradeStatus["COPIED"] = "COPIED";
    TradeStatus["SKIPPED"] = "SKIPPED";
    TradeStatus["FAILED"] = "FAILED";
})(TradeStatus || (exports.TradeStatus = TradeStatus = {}));
let LeaderTrade = class LeaderTrade {
    id;
    tradeId;
    wallet;
    marketId;
    tokenId;
    slug;
    side;
    size;
    price;
    status;
    reason;
    leaderTradeAt;
    fetchedAt;
    copiedAt;
    latencyMs;
    fetchLatencyMs;
    executionLatencyMs;
    executedSize;
    createdAt;
};
exports.LeaderTrade = LeaderTrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LeaderTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaderTrade.prototype, "tradeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaderTrade.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaderTrade.prototype, "marketId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaderTrade.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 512, nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaderTrade.prototype, "side", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 36, scale: 18 }),
    __metadata("design:type", String)
], LeaderTrade.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 36, scale: 18 }),
    __metadata("design:type", String)
], LeaderTrade.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TradeStatus,
        default: TradeStatus.PENDING,
    }),
    __metadata("design:type", String)
], LeaderTrade.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "leaderTradeAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "fetchedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "copiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "latencyMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "fetchLatencyMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "executionLatencyMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 36, scale: 18, nullable: true }),
    __metadata("design:type", Object)
], LeaderTrade.prototype, "executedSize", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeaderTrade.prototype, "createdAt", void 0);
exports.LeaderTrade = LeaderTrade = __decorate([
    (0, typeorm_1.Entity)('leader_trades'),
    (0, typeorm_1.Index)(['tradeId'], { unique: true })
], LeaderTrade);
//# sourceMappingURL=leader-trade.entity.js.map