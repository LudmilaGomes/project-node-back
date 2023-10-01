"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = exports.EditoraController = exports.AutorController = void 0;
var autor_controller_1 = require("./autor.controller");
Object.defineProperty(exports, "AutorController", { enumerable: true, get: function () { return __importDefault(autor_controller_1).default; } });
var editora_controller_1 = require("./editora.controller");
Object.defineProperty(exports, "EditoraController", { enumerable: true, get: function () { return __importDefault(editora_controller_1).default; } });
var livro_controller_1 = require("./livro.controller");
Object.defineProperty(exports, "LivroController", { enumerable: true, get: function () { return __importDefault(livro_controller_1).default; } });
