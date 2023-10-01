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
exports.CreateTableLivro1695607661436 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableLivro1695607661436 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'livro',
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
                        name: 'cod_autor',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'cod_editora',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'quantidade',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'data_public',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'genero',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'volume',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'edicao',
                        type: 'int',
                        isNullable: false,
                    },
                ]
            });
            const foreign_key_autor = new typeorm_1.TableForeignKey({
                columnNames: ['cod_autor'],
                referencedColumnNames: ['id'],
                referencedTableName: 'autor',
                onDelete: 'CASCADE'
            });
            const foreign_key_editora = new typeorm_1.TableForeignKey({
                columnNames: ['cod_editora'],
                referencedColumnNames: ['id'],
                referencedTableName: 'editora',
                onDelete: 'CASCADE'
            });
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('livro');
        });
    }
}
exports.CreateTableLivro1695607661436 = CreateTableLivro1695607661436;
