"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PolymarketClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolymarketClient = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const web3_utils_1 = require("../utils/web3-utils");
let PolymarketClient = PolymarketClient_1 = class PolymarketClient {
    logger = new common_1.Logger(PolymarketClient_1.name);
    clientPromise = null;
    async createClient() {
        const { ClobClient } = await import('@polymarket/clob-client');
        const privateKey = process.env.PRIVATE_KEY?.trim();
        if (!privateKey || privateKey.startsWith('0xyour') || privateKey.includes('...')) {
            throw new Error('Invalid or placeholder PRIVATE_KEY in .env. Set a real wallet private key to place orders.');
        }
        const provider = new ethers_1.JsonRpcProvider(process.env.RPC_URL);
        const wallet = new ethers_1.Wallet(privateKey, provider);
        const signer = new web3_utils_1.V5SignerAdapter(wallet);
        return new ClobClient('https://clob.polymarket.com', 137, signer, JSON.parse(process.env.POLYMARKET_API_CREDS), 2, process.env.FUNDER_ADDRESS);
    }
    async getClient() {
        if (!this.clientPromise) {
            this.clientPromise = this.createClient().catch((err) => {
                this.clientPromise = null;
                this.logger.warn(err.message);
                throw err;
            });
        }
        return this.clientPromise;
    }
};
exports.PolymarketClient = PolymarketClient;
exports.PolymarketClient = PolymarketClient = PolymarketClient_1 = __decorate([
    (0, common_1.Injectable)()
], PolymarketClient);
//# sourceMappingURL=polymarket.client.js.map