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
exports.CreateTableAutor1695597668928 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableAutor1695597668928 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'autor',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'data_nasc',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'nacionalidade',
                        type: 'varchar',
                        isNullable: false,
                    }
                ]
            });
            yield queryRunner.createTable(table, true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('autor');
        });
    }
}
exports.CreateTableAutor1695597668928 = CreateTableAutor1695597668928;
