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
const express_1 = require("express");
const enviroment_config_1 = __importDefault(require("../config/enviroment.config"));
const index_controller_1 = require("../controller/index.controller");
const routes = (0, express_1.Router)();
routes.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(`Server running in ${enviroment_config_1.default.app.port}`);
}));
routes.get('/socoro', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("Socoro");
}));
routes.post('/autor/', index_controller_1.AutorController.create);
routes.get('/autor/', index_controller_1.AutorController.readAutores);
routes.get('/autor/:id', index_controller_1.AutorController.readAutor);
routes.put('/autor/:id', index_controller_1.AutorController.updateAutor);
routes.delete('/autor/:id', index_controller_1.AutorController.deleteAutor);
routes.post('/editora/', index_controller_1.EditoraController.create);
routes.get('/editora/', index_controller_1.EditoraController.readEditoras);
routes.get('/editora/:id', index_controller_1.EditoraController.readEditora);
routes.put('/editora/:id', index_controller_1.EditoraController.updateEditora);
routes.delete('/editora/:id', index_controller_1.EditoraController.deleteEditora);
routes.get('/editora/', index_controller_1.EditoraController.searchByNameEditora);
routes.post('/livro/', index_controller_1.LivroController.create);
routes.get('/livro/', index_controller_1.LivroController.readLivros);
routes.get('/livro/:id', index_controller_1.LivroController.readLivro);
routes.put('/livro/:id', index_controller_1.LivroController.updateLivro);
routes.delete('/livro/:id', index_controller_1.LivroController.deleteLivro);
routes.get('/livro/', index_controller_1.LivroController.searchByNameLivro);
exports.default = routes;
