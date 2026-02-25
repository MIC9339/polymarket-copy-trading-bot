"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ethers_1 = require("ethers");
const web3_utils_1 = require("./web3-utils");
const HOST = 'https://clob.polymarket.com';
const CHAIN_ID = 137;
const RPC_URL = 'https://poly.api.pocket.network';
async function main() {
    const { ClobClient } = await import('@polymarket/clob-client');
    const provider = new ethers_1.JsonRpcProvider(RPC_URL);
    if (!process.env.PRIVATE_KEY) {
        throw new Error('PRIVATE_KEY is missing');
    }
    const wallet = new ethers_1.Wallet(process.env.PRIVATE_KEY, provider);
    const signer = new web3_utils_1.V5SignerAdapter(wallet);
    const client = new ClobClient(HOST, CHAIN_ID, signer);
    const apiCreds = await client.createOrDeriveApiKey();
    console.log('API credentials:');
    console.log(apiCreds);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=generate-api-credits.js.map