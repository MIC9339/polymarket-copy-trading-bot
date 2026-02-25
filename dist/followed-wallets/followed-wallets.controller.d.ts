import { FollowedWalletsService } from './followed-wallets.service';
import { FollowedWallet } from './entity/followed-wallet.entity';
import { AddFollowedWalletDto } from './dto/add-followed-wallet.dto';
import { UpdateFollowedWalletDto } from './dto/update-followed-wallet.dto';
export declare class FollowedWalletsController {
    private readonly service;
    constructor(service: FollowedWalletsService);
    findAll(): Promise<FollowedWallet[]>;
    findActive(): Promise<FollowedWallet[]>;
    add(body: AddFollowedWalletDto): Promise<FollowedWallet>;
    update(id: string, body: UpdateFollowedWalletDto): Promise<FollowedWallet>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
    removeByWallet(wallet: string): Promise<{
        ok: boolean;
    }>;
}
