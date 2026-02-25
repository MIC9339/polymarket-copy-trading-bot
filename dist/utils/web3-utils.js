"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V5SignerAdapter = void 0;
class V5SignerAdapter {
    v6Wallet;
    constructor(v6Wallet) {
        this.v6Wallet = v6Wallet;
    }
    async getAddress() {
        return this.v6Wallet.address;
    }
    async signMessage(msg) {
        return this.v6Wallet.signMessage(msg);
    }
    async _signTypedData(domain, types, value) {
        return this.v6Wallet.signTypedData(domain, types, value);
    }
}
exports.V5SignerAdapter = V5SignerAdapter;
//# sourceMappingURL=web3-utils.js.map