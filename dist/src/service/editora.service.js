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
const editora_1 = __importDefault(require("../repositories/editora"));
class EditoraService {
    create(nome, endereco, num_telefone, email, site, ano_fundacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            const editora = { nome, endereco, num_telefone, email, site, ano_fundacao };
            try {
                const verif_edit = yield editoraRepo.findOne(editora);
                if (verif_edit)
                    throw new Error('Editora já cadastrada!');
                const editoraDb = yield editoraRepo.save(editora);
                if (editoraDb)
                    return editoraDb;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    readEditoras() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            try {
                const editoras = yield editoraRepo.find();
                if (editoras)
                    return editoras;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    readEditora(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            try {
                const editora_encontrado = yield editoraRepo.findOne({ id });
                if (editora_encontrado)
                    return editora_encontrado;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    update(id, nome, endereco, num_telefone, email, site, ano_fundacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            try {
                const getEditora = yield editoraRepo.findOne(id);
                if (!getEditora)
                    throw new Error('Editora não encontrada!');
                const editoraDb = yield editoraRepo.update({ id, }, {
                    nome: nome ? nome : getEditora.nome,
                    endereco: endereco ? endereco : getEditora.endereco,
                    num_telefone: num_telefone ? num_telefone : getEditora.num_telefone,
                    email: email ? email : getEditora.email,
                    site: site ? site : getEditora.site,
                    ano_fundacao: ano_fundacao ? ano_fundacao : getEditora.ano_fundacao
                });
                if (editoraDb)
                    return editoraDb;
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
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            const editora = { id };
            try {
                const verifica_id = yield editoraRepo.findOne({ id });
                if (!verifica_id)
                    throw new Error('Editora não encontrada!');
                const deleta_editora = yield editoraRepo.delete(editora);
                if (!deleta_editora)
                    throw new Error('Operação não pode ser realizada!');
                return deleta_editora;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    searchByNameEditora(nome_editora) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            try {
                const busca_editora = yield editoraRepo
                    .createQueryBuilder('editora')
                    .where('editora.nome = :nome', { nome: nome_editora })
                    .getOne();
                if (!busca_editora)
                    throw new Error('Editora não encontrada!');
                return busca_editora;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = new EditoraService();
