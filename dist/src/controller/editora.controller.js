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
class EditoraController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, endereco, num_telefone, email, site, ano_fundacao } = request.body;
            try {
                const editora = yield index_service_1.EditoraService.create(nome, endereco, num_telefone, email, site, ano_fundacao);
                return response.status(200).json(editora);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!' || e.message == 'Editora já cadastrada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    readEditoras(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editora = yield index_service_1.EditoraService.readEditoras();
                return response.status(200).json(editora);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    readEditora(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const editora = yield index_service_1.EditoraService.readEditora(id);
                return response.status(200).json(editora);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    updateEditora(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, endereco, num_telefone, email, site, ano_fundacao } = request.body;
            const id = request.params.id;
            try {
                const editora = yield index_service_1.EditoraService.update(id, nome, endereco, num_telefone, email, site, ano_fundacao);
                return response.status(200).json(editora);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!' || e.message == 'Editora não encontrada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    deleteEditora(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const editora = yield index_service_1.EditoraService.delete(id);
                return response.status(200).json(editora);
            }
            catch (e) {
                if (e.message == 'Operação não pode ser realizada!' || e.message == 'Editora não encontrada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
    searchByNameEditora(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome_editora } = request.body;
            try {
                const editora = yield index_service_1.EditoraService.searchByNameEditora(nome_editora);
                return response.status(200).json(editora);
            }
            catch (e) {
                if (e.message == 'Editora não encontrada!')
                    return response.status(409).json(e.message);
                return response.status(500).json(e.message);
            }
        });
    }
}
exports.default = new EditoraController();
