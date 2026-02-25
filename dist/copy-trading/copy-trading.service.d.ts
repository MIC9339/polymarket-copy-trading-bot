import { PolymarketClient } from 'src/clients/polymarket.client';
import { CopyTradingStrategy } from './copy-trading.strategy';
import { BotPosition } from './entities/bot-position.entity';
import { LeaderTrade } from './entities/leader-trade.entity';
export declare class CopyTradingService {
    private readonly polyClient;
    private readonly strategy;
    private readonly logger;
    private readonly leaderTrades;
    private readonly botPositions;
    constructor(polyClient: PolymarketClient, strategy: CopyTradingStrategy);
    getLeaderTrades(): LeaderTrade[];
    getBotPositions(): BotPosition[];
    handleTrade(sourceWallet: string, rawTrade: any): Promise<void>;
    private tradeExists;
    private toLeaderTradeAt;
    private saveTrade;
    private updateTradeStatus;
    private getBotPosition;
    private updateBotPosition;
    private normalizeTrade;
    private executeTrade;
}
