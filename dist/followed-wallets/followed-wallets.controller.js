"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowedWalletsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const followed_wallets_service_1 = require("./followed-wallets.service");
const followed_wallet_entity_1 = require("./entity/followed-wallet.entity");
const add_followed_wallet_dto_1 = require("./dto/add-followed-wallet.dto");
const update_followed_wallet_dto_1 = require("./dto/update-followed-wallet.dto");
let FollowedWalletsController = class FollowedWalletsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll() {
        return this.service.findAll();
    }
    async findActive() {
        return this.service.findActive();
    }
    async add(body) {
        const { wallet, label } = body;
        return this.service.add(wallet, label);
    }
    async update(id, body) {
        return this.service.update(id, body);
    }
    async remove(id) {
        return this.service.remove(id);
    }
    async removeByWallet(wallet) {
        return this.service.removeByWallet(wallet);
    }
};
exports.FollowedWalletsController = FollowedWalletsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all followed wallets (followers)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all followers', type: [followed_wallet_entity_1.FollowedWallet] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FollowedWalletsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get only active followed wallets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active followers (used for copy trading)', type: [followed_wallet_entity_1.FollowedWallet] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FollowedWalletsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new follower (wallet to copy)' }),
    (0, swagger_1.ApiBody)({ type: add_followed_wallet_dto_1.AddFollowedWalletDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Follower added', type: followed_wallet_entity_1.FollowedWallet }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_followed_wallet_dto_1.AddFollowedWalletDto]),
    __metadata("design:returntype", Promise)
], FollowedWalletsController.prototype, "add", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a follower (e.g. set active/inactive)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Follower UUID' }),
    (0, swagger_1.ApiBody)({ type: update_followed_wallet_dto_1.UpdateFollowedWalletDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Follower updated', type: followed_wallet_entity_1.FollowedWallet }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_followed_wallet_dto_1.UpdateFollowedWalletDto]),
    __metadata("design:returntype", Promise)
], FollowedWalletsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a follower by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Follower UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Follower removed' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowedWalletsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('by-wallet/:wallet'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a follower by wallet address' }),
    (0, swagger_1.ApiParam)({ name: 'wallet', description: 'Wallet address (0x...)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Follower removed' }),
    __param(0, (0, common_1.Param)('wallet')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowedWalletsController.prototype, "removeByWallet", null);
exports.FollowedWalletsController = FollowedWalletsController = __decorate([
    (0, swagger_1.ApiTags)('Followers (Followed Wallets)'),
    (0, common_1.Controller)('wallets'),
    __metadata("design:paramtypes", [followed_wallets_service_1.FollowedWalletsService])
], FollowedWalletsController);
//# sourceMappingURL=followed-wallets.controller.js.map