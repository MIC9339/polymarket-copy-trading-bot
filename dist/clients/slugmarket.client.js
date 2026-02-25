"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugmarketClient = void 0;
exports.getMarketBySlug = getMarketBySlug;
const axios_1 = __importDefault(require("axios"));
exports.slugmarketClient = axios_1.default.create({
    baseURL: "https://gamma-api.polymarket.com"
});
async function getMarketBySlug(slug) {
    const res = await exports.slugmarketClient.get(`/events/slug/${slug}`);
    return res.data;
}
//# sourceMappingURL=slugmarket.client.js.map