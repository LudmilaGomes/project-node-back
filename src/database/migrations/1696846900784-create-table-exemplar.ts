import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTableExemplar1696846900784 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
			{
				name: 'exemplar',
				columns: [
					{
						name: 'id_livro',
						type: 'int',
						isPrimary: true,
						isNullable: false,
					},
					{
						name: 'quantidade',
						type: 'int',
						isNullable: false,
					}
				]
			});

		await queryRunner.createTable(table, true);

		const foreign_key_livro = new TableForeignKey(
			{
				columnNames: ['id_livro'],
				referencedColumnNames: ['id'],
				referencedTableName: 'livro',
				onDelete: 'CASCADE'
			});

		await queryRunner.createForeignKey('exemplar', foreign_key_livro);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('exemplar');
	}
}
