"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const polymarket_provider_1 = __importDefault(require("alpha-replicator"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const gammaApi = (0, polymarket_provider_1.default)();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CTB Copy Trading API')
        .setDescription('API used by the frontend: dashboard stats, followers (add/update/remove), alerts, weekly reports, comparative analysis, and Polymarket activity.')
        .setVersion('1.0')
        .addTag('Dashboard', 'Real-time stats, recent trades, weekly reports, comparative analysis')
        .addTag('Followers (Followed Wallets)', 'List, add, update (active/inactive), remove followers')
        .addTag('Alerts', 'Performance alerts and mark-as-read')
        .addTag('Polymarket', 'Trade activity by wallet address')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({ origin: true });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map