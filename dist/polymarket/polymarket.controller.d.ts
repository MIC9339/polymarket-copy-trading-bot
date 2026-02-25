import { PolymarketClient } from '../clients/polymarket.client';
import { ProxyWalletResponseDto } from './dto/proxy-wallet.dto';
import { PolymarketService } from './polymarket.service';
export interface TradeActivityDto {
    id: string;
    marketId: string;
    tokenID: string;
    side: 'BUY' | 'SELL';
    size: number;
    price: number;
    timestamp?: string;
}
export declare class PolymarketController {
    private readonly polyClient;
    private readonly service;
    constructor(polyClient: PolymarketClient, service: PolymarketService);
    getActivity(address: string): Promise<{
        trades: TradeActivityDto[];
    }>;
    getProxyWallet(username: string): Promise<ProxyWalletResponseDto>;
}
