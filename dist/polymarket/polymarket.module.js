"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolymarketModule = void 0;
const common_1 = require("@nestjs/common");
const polymarket_client_1 = require("../clients/polymarket.client");
const polymarket_service_1 = require("./polymarket.service");
const polymarket_poller_1 = require("./polymarket.poller");
const copy_trading_module_1 = require("../copy-trading/copy-trading.module");
const followed_wallets_module_1 = require("../followed-wallets/followed-wallets.module");
let PolymarketModule = class PolymarketModule {
};
exports.PolymarketModule = PolymarketModule;
exports.PolymarketModule = PolymarketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => copy_trading_module_1.CopyTradingModule),
            followed_wallets_module_1.FollowedWalletsModule
        ],
        providers: [
            polymarket_client_1.PolymarketClient,
            polymarket_service_1.PolymarketService,
            polymarket_poller_1.PolymarketPoller,
        ],
        exports: [
            polymarket_client_1.PolymarketClient,
            polymarket_service_1.PolymarketService,
        ],
    })
], PolymarketModule);
//# sourceMappingURL=polymarket.module.js.map