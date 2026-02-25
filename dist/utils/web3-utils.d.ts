export declare class V5SignerAdapter {
    private v6Wallet;
    constructor(v6Wallet: any);
    getAddress(): Promise<any>;
    signMessage(msg: string | Uint8Array): Promise<any>;
    _signTypedData(domain: any, types: any, value: any): Promise<any>;
}
