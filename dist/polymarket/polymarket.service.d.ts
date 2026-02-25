export interface PolymarketActivityItem {
    proxyWallet: string;
    timestamp: number;
    conditionId: string;
    type: string;
    size: number;
    usdcSize: number;
    transactionHash: string;
    price: number;
    asset: string;
    side: string;
    outcomeIndex: number;
    title: string;
    slug: string;
    icon: string;
    eventSlug: string;
    outcome: string;
    name: string;
    pseudonym: string;
    bio: string;
    profileImage: string;
    profileImageOptimized: string;
    [key: string]: unknown;
}
export declare class PolymarketService {
    getProxyWallet(username: string): Promise<string | null>;
    getActivity(proxyWallet: string, limit?: number): Promise<PolymarketActivityItem[]>;
}
