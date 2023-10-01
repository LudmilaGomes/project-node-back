"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    type: 'postgres',
    port: Number(process.env.TYPEORM_PORT),
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    autoLoadEntities: true,
    ssl: false,
    entities: ["src/models/**"],
    migrations: ["src/database/migrations/**"],
    cli: {
        migrationsDir: "src/database/migrations",
        entitiesDir: "src/models/",
    }
};
