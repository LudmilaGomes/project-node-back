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
exports.Livro = void 0;
const typeorm_1 = require("typeorm");
const Autor_1 = require("./Autor");
const Editora_1 = require("./Editora");
let Livro = class Livro {
};
exports.Livro = Livro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], Livro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "nome" }),
    __metadata("design:type", String)
], Livro.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "descricao" }),
    __metadata("design:type", String)
], Livro.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "quantidade" }),
    __metadata("design:type", Number)
], Livro.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "data_public" }),
    __metadata("design:type", String)
], Livro.prototype, "dataPublic", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "genero" }),
    __metadata("design:type", String)
], Livro.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "volume", nullable: true }),
    __metadata("design:type", Object)
], Livro.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "edicao" }),
    __metadata("design:type", Number)
], Livro.prototype, "edicao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Autor_1.Autor, (autor) => autor.livros, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)([{ name: "cod_autor", referencedColumnName: "id" }]),
    __metadata("design:type", Autor_1.Autor)
], Livro.prototype, "codAutor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Editora_1.Editora, (editora) => editora.livros, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "cod_editora", referencedColumnName: "id" }]),
    __metadata("design:type", Editora_1.Editora)
], Livro.prototype, "codEditora", void 0);
exports.Livro = Livro = __decorate([
    (0, typeorm_1.Entity)("livro", { schema: "public" })
], Livro);
