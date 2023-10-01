"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const autor_1 = __importDefault(require("../repositories/autor"));
require("reflect-metadata");
class AutorService {
    create(nome, data_nasc, nacionalidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const autorRepo = connection.getCustomRepository(autor_1.default);
            const autor = { nome, data_nasc, nacionalidade };
            try {
                const verif_aut = yield autorRepo.findOne(autor);
                if (verif_aut)
                    throw new Error('Autor já cadastrado!');
                const autorDb = yield autorRepo.save(autor);
                if (autorDb)
                    return autorDb;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    readAutores() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("socoro1");
            const connection = yield (0, typeorm_1.getConnection)();
            console.log("socoro2");
            const autorRepo = connection.getCustomRepository(autor_1.default);
            console.log("socoro3");
            try {
                console.log("socoro2");
                const autores = yield autorRepo.find();
                console.log("socoro3");
                if (autores) {
                    console.log("socoro4");
                    return autores;
                }
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    readAutor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const autorRepo = connection.getCustomRepository(autor_1.default);
            try {
                const autor_encontrado = yield autorRepo.findOne({ id });
                if (autor_encontrado)
                    return autor_encontrado;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    update(id, nome, data_nasc, nacionalidade) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const autorRepo = connection.getCustomRepository(autor_1.default);
            try {
                const getAutor = yield autorRepo.findOne(id);
                if (!getAutor)
                    throw new Error('Autor não encontrado!');
                const autorDb = yield autorRepo.update({ id, }, {
                    nome: nome ? nome : getAutor.nome,
                    data_nasc: data_nasc ? data_nasc : getAutor.data_nasc,
                    nacionalidade: nacionalidade ? nacionalidade : getAutor.nacionalidade
                });
                if (autorDb)
                    return autorDb;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const autorRepo = connection.getCustomRepository(autor_1.default);
            const autor = { id };
            try {
                const verifica_id = yield autorRepo.findOne({ id });
                if (!verifica_id)
                    throw new Error('Autor não encontrado!');
                const deleta_autor = yield autorRepo.delete(autor);
                if (!deleta_autor)
                    throw new Error('Operação não pode ser realizada!');
                return deleta_autor;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    searchByNameAutor(nome_autor) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const autorRepo = connection.getCustomRepository(autor_1.default);
            try {
                const busca_autor = yield autorRepo
                    .createQueryBuilder('autor')
                    .where('autor.nome = :nome', { nome: nome_autor })
                    .getOne();
                if (!busca_autor)
                    throw new Error('Autor não encontrado!');
                return busca_autor;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = new AutorService();
