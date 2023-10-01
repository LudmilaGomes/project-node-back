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
exports.Editora = void 0;
const typeorm_1 = require("typeorm");
const Livro_1 = require("./Livro");
let Editora = class Editora {
};
exports.Editora = Editora;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], Editora.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "nome" }),
    __metadata("design:type", String)
], Editora.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "endereco" }),
    __metadata("design:type", String)
], Editora.prototype, "endereco", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "num_telefone" }),
    __metadata("design:type", String)
], Editora.prototype, "numTelefone", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "email" }),
    __metadata("design:type", String)
], Editora.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "site", nullable: true }),
    __metadata("design:type", Object)
], Editora.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "ano_fundacao" }),
    __metadata("design:type", Number)
], Editora.prototype, "anoFundacao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Livro_1.Livro, (livro) => livro.codEditora),
    __metadata("design:type", Array)
], Editora.prototype, "livros", void 0);
exports.Editora = Editora = __decorate([
    (0, typeorm_1.Entity)("editora", { schema: "public" })
], Editora);
