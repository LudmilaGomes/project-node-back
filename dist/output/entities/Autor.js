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
exports.Autor = void 0;
const typeorm_1 = require("typeorm");
const Livro_1 = require("./Livro");
let Autor = class Autor {
};
exports.Autor = Autor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], Autor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "nome" }),
    __metadata("design:type", String)
], Autor.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "data_nasc" }),
    __metadata("design:type", String)
], Autor.prototype, "data_nasc", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "nacionalidade" }),
    __metadata("design:type", String)
], Autor.prototype, "nacionalidade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Livro_1.Livro, (livro) => livro.codAutor),
    __metadata("design:type", Array)
], Autor.prototype, "livros", void 0);
exports.Autor = Autor = __decorate([
    (0, typeorm_1.Entity)("autor", { schema: "public" })
], Autor);
