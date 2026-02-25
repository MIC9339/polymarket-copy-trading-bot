"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const polymarket_client_1 = require("./clients/polymarket.client");
const polymarket_controller_1 = require("./polymarket/polymarket.controller");
const polymarket_service_1 = require("./polymarket/polymarket.service");
const polymarket_poller_1 = require("./polymarket/polymarket.poller");
const copy_trading_module_1 = require("./copy-trading/copy-trading.module");
const followed_wallets_module_1 = require("./followed-wallets/followed-wallets.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const alerts_module_1 = require("./alerts/alerts.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            schedule_1.ScheduleModule.forRoot(),
            copy_trading_module_1.CopyTradingModule,
            followed_wallets_module_1.FollowedWalletsModule,
            dashboard_module_1.DashboardModule,
            alerts_module_1.AlertsModule,
        ],
        controllers: [polymarket_controller_1.PolymarketController],
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
], AppModule);
//# sourceMappingURL=app.module.js.map