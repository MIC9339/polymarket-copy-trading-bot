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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolymarketController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const polymarket_client_1 = require("../clients/polymarket.client");
const trade_activity_dto_1 = require("./dto/trade-activity.dto");
const proxy_wallet_dto_1 = require("./dto/proxy-wallet.dto");
const polymarket_service_1 = require("./polymarket.service");
let PolymarketController = class PolymarketController {
    polyClient;
    service;
    constructor(polyClient, service) {
        this.polyClient = polyClient;
        this.service = service;
    }
    async getActivity(address) {
        if (!address?.trim()) {
            return { trades: [] };
        }
        const client = await this.polyClient.getClient();
        const rawTrades = await client.getTrades({
            maker: address.trim(),
            limit: 50,
        });
        const trades = (rawTrades ?? []).map((t) => ({
            id: t.id,
            marketId: t.market_id ?? t.marketId ?? '',
            tokenID: t.market_token_id ?? t.tokenID ?? '',
            side: t.side ?? 'BUY',
            size: Number(t.size ?? 0),
            price: Number(t.price ?? 0),
            timestamp: t.timestamp ?? t.created_at,
        }));
        return { trades };
    }
    async getProxyWallet(username) {
        return {
            username,
            proxyWallet: await this.service.getProxyWallet(username),
        };
    }
};
exports.PolymarketController = PolymarketController;
__decorate([
    (0, common_1.Get)('activity'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trade activity for a wallet address' }),
    (0, swagger_1.ApiQuery)({ name: 'address', required: true, type: String, description: 'Wallet address (maker) to fetch trades for' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of trades for the wallet', type: trade_activity_dto_1.TradeActivityResponseDto }),
    __param(0, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolymarketController.prototype, "getActivity", null);
__decorate([
    (0, common_1.Get)('proxy-wallet/:username'),
    (0, swagger_1.ApiOperation)({ summary: 'Get proxy wallet address for a Polymarket username' }),
    (0, swagger_1.ApiParam)({ name: 'username', description: 'Polymarket username (without @)', example: 'trader1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Username and resolved proxy wallet address (or null)', type: proxy_wallet_dto_1.ProxyWalletResponseDto }),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolymarketController.prototype, "getProxyWallet", null);
exports.PolymarketController = PolymarketController = __decorate([
    (0, swagger_1.ApiTags)('Polymarket'),
    (0, common_1.Controller)('polymarket'),
    __metadata("design:paramtypes", [polymarket_client_1.PolymarketClient,
        polymarket_service_1.PolymarketService])
], PolymarketController);
//# sourceMappingURL=polymarket.controller.js.map