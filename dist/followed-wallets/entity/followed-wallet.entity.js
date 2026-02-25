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
exports.FollowedWallet = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let FollowedWallet = class FollowedWallet {
    id;
    wallet;
    label;
    isActive;
    lastTradeId;
    createdAt;
    updatedAt;
};
exports.FollowedWallet = FollowedWallet;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Follower UUID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FollowedWallet.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet address (0x...)' }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FollowedWallet.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional label (e.g. @Leader1)', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FollowedWallet.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether copy trading is active for this follower' }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], FollowedWallet.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last processed trade ID (cursor); null until first poll, then set by poller', required: false }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], FollowedWallet.prototype, "lastTradeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at (ISO 8601)' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FollowedWallet.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at (ISO 8601)' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FollowedWallet.prototype, "updatedAt", void 0);
exports.FollowedWallet = FollowedWallet = __decorate([
    (0, typeorm_1.Entity)()
], FollowedWallet);
//# sourceMappingURL=followed-wallet.entity.js.map