import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableLivro1695607661436 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
		{
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

		await queryRunner.createTable(table, true);

		const foreign_key_autor = new TableForeignKey({
			columnNames: ['cod_autor'],
			referencedColumnNames: ['id'],
			referencedTableName: 'autor',
			onDelete: 'CASCADE'
		});
		
		const foreign_key_editora = new TableForeignKey({
			columnNames: ['cod_editora'],
			referencedColumnNames: ['id'],
			referencedTableName: 'editora',
			onDelete: 'CASCADE'
		});

		await queryRunner.createForeignKeys('livro', [foreign_key_autor,foreign_key_editora]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('livro');
	}
}
