import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTableMulta1696846871678 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
			{
				name: 'multa',
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
						name: 'id_usuario',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'id_emprestimo',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'valor_multa',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'data_limite',
						type: 'date',
						isNullable: false,
					},
					{
						name: 'data_hoje',
						type: 'date',
						isNullable: false,
					},
					{
						name: 'multa_paga',
						type: 'int',
						isNullable: false,
					},
				]
			});

		await queryRunner.createTable(table, true);

		const foreign_key_usuario = new TableForeignKey(
		{
			columnNames: ['id_usuario'],
			referencedColumnNames: ['id'],
			referencedTableName: 'usuario',
			onDelete: 'CASCADE'
		});

		const foreign_key_emprestimo = new TableForeignKey(
		{
			columnNames: ['id_emprestimo'],
			referencedColumnNames: ['id'],
			referencedTableName: 'emprestimo',
			onDelete: 'CASCADE'
		});

		const foreign_key_multa_estado = new TableForeignKey(
		{
			columnNames: ['multa_paga'],
			referencedColumnNames: ['id'],
			referencedTableName: 'estado_bool',
			onDelete: 'CASCADE'
		});

		await queryRunner.createForeignKeys('multa', [foreign_key_usuario, 
			foreign_key_emprestimo, foreign_key_multa_estado]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('multa');
	}	
}
