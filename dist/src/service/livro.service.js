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
const livro_1 = __importDefault(require("../repositories/livro"));
const autor_1 = __importDefault(require("../repositories/autor"));
const editora_1 = __importDefault(require("../repositories/editora"));
class LivroService {
    create(nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const livroRepo = connection.getCustomRepository(livro_1.default);
            const autorRepo = connection.getCustomRepository(autor_1.default);
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            try {
                const verifica_autor = yield autorRepo
                    .createQueryBuilder('autor')
                    .where('autor.nome = :nome', { nome: nome_autor })
                    .getOne();
                if (!verifica_autor)
                    throw new Error('Autor não cadastrado!');
                const verifica_editora = yield editoraRepo
                    .createQueryBuilder('editora')
                    .where('editora.nome = :nome', { nome: nome_editora })
                    .getOne();
                if (!verifica_editora)
                    throw new Error('Editora não cadastrada!');
                const cod_editora = verifica_autor.id;
                const cod_autor = verifica_autor.id;
                const livro = { nome, cod_autor, cod_editora, descricao, quantidade, data_public, genero, volume, edicao };
                const livroDb = yield livroRepo.save(livro);
                if (livroDb)
                    return livroDb;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    readLivros(nome_autor) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const livroRepo = connection.getCustomRepository(livro_1.default);
            try {
                const livros = yield livroRepo.find();
                if (livros)
                    return livros;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    readLivro(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const livroRepo = connection.getCustomRepository(livro_1.default);
            try {
                const livro_encontrado = yield livroRepo.findOne({ id });
                if (livro_encontrado)
                    return livro_encontrado;
                else
                    throw new Error('Operação não pode ser realizada!');
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    update(id, nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const livroRepo = connection.getCustomRepository(livro_1.default);
            const autorRepo = connection.getCustomRepository(autor_1.default);
            const editoraRepo = connection.getCustomRepository(editora_1.default);
            try {
                const getLivro = yield livroRepo.findOne(id);
                if (!getLivro)
                    throw new Error('Livro não encontrado!');
                const verifica_autor = yield autorRepo
                    .createQueryBuilder('autor')
                    .where('autor.nome = :nome', { nome: nome_autor })
                    .getOne();
                if (!verifica_autor)
                    throw new Error('Autor não encontrado!');
                const verifica_editora = yield editoraRepo
                    .createQueryBuilder('editora')
                    .where('editora.nome = :nome', { nome: nome_editora })
                    .getOne();
                if (!verifica_editora)
                    throw new Error('Editora não encontrada!');
                const cod_editora = verifica_autor.id;
                const cod_autor = verifica_autor.id;
                const livroDb = yield livroRepo.update({ id, }, {
                    nome: nome ? nome : getLivro.nome,
                    cod_autor: cod_autor ? cod_autor : getLivro.cod_autor,
                    cod_editora: cod_editora ? cod_editora : getLivro.cod_editora,
                    descricao: descricao ? descricao : getLivro.descricao,
                    quantidade: quantidade ? quantidade : getLivro.quantidade,
                    data_public: data_public ? data_public : getLivro.data_public,
                    genero: genero ? genero : getLivro.genero,
                    volume: volume ? volume : getLivro.volume,
                    edicao: edicao ? edicao : getLivro.edicao,
                });
                if (livroDb)
                    return livroDb;
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
            const livroRepo = connection.getCustomRepository(livro_1.default);
            const livro = { id };
            try {
                const verifica_id = yield livroRepo.findOne({ id });
                if (!verifica_id)
                    throw new Error('Livro não encontrado!');
                const deleta_livro = yield livroRepo.delete(livro);
                if (!deleta_livro)
                    throw new Error('Operação não pode ser realizada!');
                return deleta_livro;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    searchByNameLivro(nome_livro) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const livroRepo = connection.getCustomRepository(livro_1.default);
            try {
                const busca_livro = yield livroRepo
                    .createQueryBuilder('livro')
                    .where('livro.nome = :nome', { nome: nome_livro })
                    .getOne();
                if (!busca_livro)
                    throw new Error('Operação não pode ser realizada!');
                return busca_livro;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = new LivroService();
