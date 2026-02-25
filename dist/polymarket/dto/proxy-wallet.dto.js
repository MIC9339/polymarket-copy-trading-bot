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
exports.ProxyWalletResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProxyWalletResponseDto {
    username;
    proxyWallet;
}
exports.ProxyWalletResponseDto = ProxyWalletResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Polymarket username (without @)', example: 'trader1' }),
    __metadata("design:type", String)
], ProxyWalletResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Proxy wallet address for the user, or null if not found',
        example: '0x1234...',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProxyWalletResponseDto.prototype, "proxyWallet", void 0);
//# sourceMappingURL=proxy-wallet.dto.js.map