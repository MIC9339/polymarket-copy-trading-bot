"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function requireEnv(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
exports.env = {
    nodeEnv: requireEnv("NODE_ENV"),
    polymarketApiBase: requireEnv("POLYMARKET_API_BASE"),
    defaultLimit: Number(process.env.DEFAULT_LIMIT ?? 25),
    requestTimeoutMs: Number(process.env.REQUEST_TIMEOUT_MS ?? 5000),
};
//# sourceMappingURL=env.js.map