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
exports.AddFollowedWalletDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddFollowedWalletDto {
    wallet;
    label;
}
exports.AddFollowedWalletDto = AddFollowedWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet address to follow', example: '0xabc123...' }),
    __metadata("design:type", String)
], AddFollowedWalletDto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional label for the wallet', required: false, example: 'Leader Wallet' }),
    __metadata("design:type", String)
], AddFollowedWalletDto.prototype, "label", void 0);
//# sourceMappingURL=add-followed-wallet.dto.js.map