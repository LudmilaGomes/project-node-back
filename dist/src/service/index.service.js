"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = exports.EditoraService = exports.AutorService = void 0;
var autor_service_1 = require("./autor.service");
Object.defineProperty(exports, "AutorService", { enumerable: true, get: function () { return __importDefault(autor_service_1).default; } });
var editora_service_1 = require("./editora.service");
Object.defineProperty(exports, "EditoraService", { enumerable: true, get: function () { return __importDefault(editora_service_1).default; } });
var livro_service_1 = require("./livro.service");
Object.defineProperty(exports, "LivroService", { enumerable: true, get: function () { return __importDefault(livro_service_1).default; } });
