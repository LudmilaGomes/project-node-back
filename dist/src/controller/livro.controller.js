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
Object.defineProperty(exports, "__esModule", { value: true });
const index_service_1 = require("../service/index.service");
class LivroController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao } = request.body;
            try {
                const livro = yield index_service_1.LivroService.create(nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao);
                return response.status(200).json(livro);
            }
            catch (e) {
                if (e.message == 'Autor não cadastrado!' || e.message == 'Editora não cadastrada!' || e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    readLivros(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome_autor } = request.body;
            try {
                const livro = yield index_service_1.LivroService.readLivros(nome_autor);
                return response.status(200).json(livro);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    readLivro(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const livro = yield index_service_1.LivroService.readLivro(id);
                return response.status(200).json(livro);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    updateLivro(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao } = request.body;
            const id = request.params.id;
            try {
                const livro = yield index_service_1.LivroService.update(id, nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao);
                return response.status(200).json(livro);
            }
            catch (e) {
                if (e.message == 'Livro não encontrado!' || e.message == 'Autor não encontrado!' || e.message == 'Editora não encontrada!' || e.message == '')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    deleteLivro(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const livro = yield index_service_1.LivroService.delete(id);
                return response.status(200).json(livro);
            }
            catch (e) {
                if (e.message == 'Livro não encontrado!' || e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    searchByNameLivro(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome_livro } = request.body;
            try {
                const livro = yield index_service_1.LivroService.searchByNameLivro(nome_livro);
                return response.status(200).json(livro);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
}
exports.default = new LivroController();
