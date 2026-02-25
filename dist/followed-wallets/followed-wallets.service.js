"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowedWalletsService = void 0;
const common_1 = require("@nestjs/common");
let FollowedWalletsService = class FollowedWalletsService {
    store = [];
    async findAll() {
        return [...this.store].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async findActive() {
        return this.store.filter((w) => w.isActive);
    }
    async add(wallet, label) {
        const normalized = wallet.trim().toLowerCase();
        if (!normalized) {
            throw new common_1.ConflictException('Wallet address is required');
        }
        const existing = this.store.find((w) => w.wallet === normalized);
        if (existing)
            return existing;
        const now = new Date();
        const newWallet = {
            id: crypto.randomUUID(),
            wallet: normalized,
            label: label?.trim() || undefined,
            isActive: true,
            lastTradeId: undefined,
            createdAt: now,
            updatedAt: now,
        };
        this.store.push(newWallet);
        return newWallet;
    }
    async update(id, data) {
        const wallet = this.store.find((w) => w.id === id);
        if (!wallet)
            throw new common_1.NotFoundException('Followed wallet not found');
        if (data.label !== undefined)
            wallet.label = data.label?.trim() || undefined;
        if (data.isActive !== undefined)
            wallet.isActive = data.isActive;
        if (data.lastTradeId !== undefined) {
            wallet.lastTradeId =
                data.lastTradeId === null || data.lastTradeId === '' ? null : data.lastTradeId;
        }
        wallet.updatedAt = new Date();
        return wallet;
    }
    async remove(id) {
        const idx = this.store.findIndex((w) => w.id === id);
        if (idx !== -1)
            this.store.splice(idx, 1);
        return { ok: true };
    }
    async removeByWallet(wallet) {
        const normalized = wallet.trim().toLowerCase();
        const idx = this.store.findIndex((w) => w.wallet === normalized);
        if (idx !== -1)
            this.store.splice(idx, 1);
        return { ok: true };
    }
};
exports.FollowedWalletsService = FollowedWalletsService;
exports.FollowedWalletsService = FollowedWalletsService = __decorate([
    (0, common_1.Injectable)()
], FollowedWalletsService);
//# sourceMappingURL=followed-wallets.service.js.map