"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolymarketService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const DATA_API_ACTIVITY = 'https://data-api.polymarket.com/activity';
let PolymarketService = class PolymarketService {
    async getProxyWallet(username) {
        const url = `https://polymarket.com/@${username}`;
        const { data: html } = await axios_1.default.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });
        const $ = cheerio.load(html);
        const nextDataRaw = $('#__NEXT_DATA__').html();
        if (!nextDataRaw) {
            throw new common_1.InternalServerErrorException('__NEXT_DATA__ not found');
        }
        let nextData;
        try {
            nextData = JSON.parse(nextDataRaw);
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to parse __NEXT_DATA__');
        }
        const queries = nextData?.props?.pageProps?.dehydratedState?.queries;
        if (!Array.isArray(queries))
            return null;
        for (const q of queries) {
            const proxyWallet = q?.state?.data?.proxyWallet;
            if (proxyWallet) {
                return proxyWallet;
            }
        }
        return null;
    }
    async getActivity(proxyWallet, limit = 20) {
        const { data } = await axios_1.default.get(DATA_API_ACTIVITY, {
            params: { user: proxyWallet, limit },
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CTB/1.0)' },
        });
        return Array.isArray(data) ? data : [];
    }
};
exports.PolymarketService = PolymarketService;
exports.PolymarketService = PolymarketService = __decorate([
    (0, common_1.Injectable)()
], PolymarketService);
//# sourceMappingURL=polymarket.service.js.map