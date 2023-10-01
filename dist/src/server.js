"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const enviroment_config_1 = __importDefault(require("./config/enviroment.config"));
require("./config/database.config");
require("./menu");
const PORT = enviroment_config_1.default.app.port;
app_1.default.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
