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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceAlert = exports.AlertSeverity = exports.AlertType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
var AlertType;
(function (AlertType) {
    AlertType["HIGH_FAIL_RATE"] = "HIGH_FAIL_RATE";
    AlertType["LOW_COPY_RATE"] = "LOW_COPY_RATE";
    AlertType["NO_RECENT_TRADES"] = "NO_RECENT_TRADES";
    AlertType["DEVIATION_FROM_LEADER"] = "DEVIATION_FROM_LEADER";
})(AlertType || (exports.AlertType = AlertType = {}));
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["INFO"] = "INFO";
    AlertSeverity["WARNING"] = "WARNING";
    AlertSeverity["CRITICAL"] = "CRITICAL";
})(AlertSeverity || (exports.AlertSeverity = AlertSeverity = {}));
let PerformanceAlert = class PerformanceAlert {
    id;
    type;
    severity;
    message;
    metadata;
    read;
    createdAt;
};
exports.PerformanceAlert = PerformanceAlert;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert UUID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PerformanceAlert.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AlertType, description: 'Alert type' }),
    (0, typeorm_1.Column)({ type: 'enum', enum: AlertType }),
    __metadata("design:type", String)
], PerformanceAlert.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AlertSeverity, description: 'Severity' }),
    (0, typeorm_1.Column)({ type: 'enum', enum: AlertSeverity, default: AlertSeverity.WARNING }),
    __metadata("design:type", String)
], PerformanceAlert.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert message' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], PerformanceAlert.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Extra metadata', required: false }),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], PerformanceAlert.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the alert has been read' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PerformanceAlert.prototype, "read", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at (ISO 8601)' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PerformanceAlert.prototype, "createdAt", void 0);
exports.PerformanceAlert = PerformanceAlert = __decorate([
    (0, typeorm_1.Entity)('performance_alerts'),
    (0, typeorm_1.Index)(['createdAt'])
], PerformanceAlert);
//# sourceMappingURL=performance-alert.entity.js.map