import { FollowedWallet } from './entity/followed-wallet.entity';
export declare class FollowedWalletsService {
    private readonly store;
    findAll(): Promise<FollowedWallet[]>;
    findActive(): Promise<FollowedWallet[]>;
    add(wallet: string, label?: string): Promise<FollowedWallet>;
    update(id: string, data: {
        label?: string;
        isActive?: boolean;
        lastTradeId?: string | null;
    }): Promise<FollowedWallet>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
    removeByWallet(wallet: string): Promise<{
        ok: boolean;
    }>;
}
