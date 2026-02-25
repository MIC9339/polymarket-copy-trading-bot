import { OnModuleInit } from "@nestjs/common";
import { CopyTradingService } from "src/copy-trading/copy-trading.service";
import { FollowedWallet } from "src/followed-wallets/entity/followed-wallet.entity";
import { FollowedWalletsService } from "src/followed-wallets/followed-wallets.service";
import { PolymarketService, PolymarketActivityItem } from "./polymarket.service";
export declare class PolymarketPoller implements OnModuleInit {
    private readonly copyService;
    private readonly followedWallets;
    private readonly polymarketService;
    private readonly logger;
    constructor(copyService: CopyTradingService, followedWallets: FollowedWalletsService, polymarketService: PolymarketService);
    private activityTradeId;
    private activityToRawTrade;
    onModuleInit(): Promise<void>;
    private logLatestTradesForTest;
    initializeCursor(wallet: FollowedWallet, tradeActivities: PolymarketActivityItem[]): Promise<void>;
    pollFollowedUsers(): Promise<void>;
}
