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
exports.TypeormMetadata = void 0;
const typeorm_1 = require("typeorm");
let TypeormMetadata = class TypeormMetadata {
};
exports.TypeormMetadata = TypeormMetadata;
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "type" }),
    __metadata("design:type", String)
], TypeormMetadata.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "database", nullable: true }),
    __metadata("design:type", Object)
], TypeormMetadata.prototype, "database", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "schema", nullable: true }),
    __metadata("design:type", Object)
], TypeormMetadata.prototype, "schema", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "table", nullable: true }),
    __metadata("design:type", Object)
], TypeormMetadata.prototype, "table", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "name", nullable: true }),
    __metadata("design:type", Object)
], TypeormMetadata.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "value", nullable: true }),
    __metadata("design:type", Object)
], TypeormMetadata.prototype, "value", void 0);
exports.TypeormMetadata = TypeormMetadata = __decorate([
    (0, typeorm_1.Entity)("typeorm_metadata", { schema: "public" })
], TypeormMetadata);
