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
class AutorController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, data_nasc, nacionalidade } = request.body;
            try {
                const autor = yield index_service_1.AutorService.create(nome, data_nasc, nacionalidade);
                return response.status(200).json(autor);
            }
            catch (e) {
                if (e.message == 'Autor já cadastrado!' || e.message == 'Operação não pode ser realizada!' || e.message == 'Autor não encontrado!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    readAutores(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("socoro34");
                const autor = yield index_service_1.AutorService.readAutores();
                console.log("socoro35");
                return response.status(200).json(autor);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    readAutor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const autor = yield index_service_1.AutorService.readAutor(id);
                return response.status(200).json(autor);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    updateAutor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, data_nasc, nacionalidade } = request.body;
            const id = request.params.id;
            try {
                const autor = yield index_service_1.AutorService.update(id, nome, data_nasc, nacionalidade);
                return response.status(200).json(autor);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!' || e.message == 'Autor não encontrado!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    deleteAutor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const autor = yield index_service_1.AutorService.delete(id);
                return response.status(200).json(autor);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!' || e.message == 'Autor não encontrado!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    searchByNameAutor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome_autor } = request.body;
            try {
                const autor = yield index_service_1.AutorService.searchByNameAutor(nome_autor);
                return response.status(200).json(autor);
            }
            catch (e) {
                if (e.message == 'Autor não encontrado!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
}
exports.default = new AutorController();
