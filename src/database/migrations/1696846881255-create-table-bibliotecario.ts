import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableBibliotecario1696846881255 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
		{
			name: 'bibliotecario', // nome da tabela
			columns: [		 // colunas da tabela
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
					name: 'cpf',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'email',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'senha',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'data_nasc',
					type: 'date',
					isNullable: false,
				},
				{
					name: 'genero',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'endereco',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'telefone',
					type: 'varchar',
					isNullable: false,
				},
				{
					name: 'data_admissao',
					type: 'date',
					isNullable: false,
				},
				{
					name: 'formacao_academica',
					type: 'varchar',
					isNullable: false,
				},
			]
		});
		await queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('bibliotecario', true);
	}
}
