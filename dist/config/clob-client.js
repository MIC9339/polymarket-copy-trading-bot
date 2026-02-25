"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClobClient = createClobClient;
require("dotenv/config");
const ethers_1 = require("ethers");
const web3_utils_1 = require("../utils/web3-utils");
const HOST = 'https://clob.polymarket.com';
const CHAIN_ID = 137;
const RPC_URL = 'https://poly.api.pocket.network';
const apiCreds = {
    key: 'e51ce9d8-91c5-bb31-c6cb-e58822195925',
    secret: 'kRphxOZl_bAsCH-xTHzbpl-EUgI25VkmRnrgFemHWaQ=',
    passphrase: 'c661cab9091301287a7fdae43f5c40547ac0c4caf00c127167d1130f0fa77a92',
};
async function createClobClient() {
    const { ClobClient } = await import('@polymarket/clob-client');
    const provider = new ethers_1.JsonRpcProvider(RPC_URL);
    const wallet = new ethers_1.Wallet(process.env.PRIVATE_KEY, provider);
    const signer = new web3_utils_1.V5SignerAdapter(wallet);
    return new ClobClient(HOST, CHAIN_ID, signer, apiCreds, 2, process.env.FUNDER_ADDRESS);
}
//# sourceMappingURL=clob-client.js.map