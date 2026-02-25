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
exports.UpdateFollowedWalletDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateFollowedWalletDto {
    label;
    isActive;
    lastTradeId;
}
exports.UpdateFollowedWalletDto = UpdateFollowedWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional label for the wallet', required: false }),
    __metadata("design:type", String)
], UpdateFollowedWalletDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the wallet is active for copy trading', required: false }),
    __metadata("design:type", Boolean)
], UpdateFollowedWalletDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reset cursor (set to null for "first run" testing)', required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateFollowedWalletDto.prototype, "lastTradeId", void 0);
//# sourceMappingURL=update-followed-wallet.dto.js.map