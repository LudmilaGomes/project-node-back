import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableEmprestimo1696846889712 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
		{
			name: 'emprestimo',
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
					name: 'id_exemplar',
					type: 'int',
					isNullable: false,
				},
				{
					name: 'id_bibliotecario',
					type: 'int',
					isNullable: false,
				},
				{
					name: 'data_realizacao',
					type: 'int',
					isNullable: false,
				},
				{
					name: 'data_devolucao',
					type: 'int',
					isNullable: false,
				},
				{
					name: 'tem_multa',
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

	const foreign_key_exemplar = new TableForeignKey(
	{
		columnNames: ['id_exemplar'],
		referencedColumnNames: ['id_livro'],
		referencedTableName: 'exemplar',
		onDelete: 'CASCADE'
	});

	const foreign_key_bibliot = new TableForeignKey(
	{
		columnNames: ['id_bibliotecario'],
		referencedColumnNames: ['id'],
		referencedTableName: 'bibliotecario',
		onDelete: 'CASCADE'
	});

	const foreign_key_estado = new TableForeignKey(
	{
		columnNames: ['tem_multa'],
		referencedColumnNames: ['id'],
		referencedTableName: 'estado_bool',
		onDelete: 'CASCADE'
	});

	await queryRunner.createForeignKeys('emprestimo', [foreign_key_usuario, 
		foreign_key_exemplar, foreign_key_bibliot, foreign_key_estado]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('emprestimo');
	}
}
