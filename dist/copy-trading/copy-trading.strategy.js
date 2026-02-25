"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyTradingStrategy = void 0;
const common_1 = require("@nestjs/common");
let CopyTradingStrategy = class CopyTradingStrategy {
    MIN_EXECUTABLE_SIZE = 1;
    MIN_SIGNAL_SIZE = 5;
    MAX_POSITION_SIZE = 5;
    decide(params) {
        const { leaderNetChange, botCurrentPosition } = params;
        if (Math.abs(leaderNetChange) < this.MIN_SIGNAL_SIZE) {
            return {
                shouldTrade: false,
                reason: 'Leader change too small (rebalance)',
            };
        }
        const side = leaderNetChange > 0 ? 'BUY' : 'SELL';
        if ((side === 'BUY' && botCurrentPosition > 0) ||
            (side === 'SELL' && botCurrentPosition < 0)) {
            return {
                shouldTrade: false,
                reason: 'Bot already aligned',
            };
        }
        return {
            shouldTrade: true,
            side,
            size: this.MAX_POSITION_SIZE,
            reason: 'Leader showed meaningful intent',
        };
    }
};
exports.CopyTradingStrategy = CopyTradingStrategy;
exports.CopyTradingStrategy = CopyTradingStrategy = __decorate([
    (0, common_1.Injectable)()
], CopyTradingStrategy);
//# sourceMappingURL=copy-trading.strategy.js.map