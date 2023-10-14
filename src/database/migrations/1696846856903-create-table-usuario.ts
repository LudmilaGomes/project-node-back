import { table } from "console";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTableUsuario1696846856903 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
			{
				name: 'usuario', // nome da tabela
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
						name: 'eh_estudante',
						type: 'int',
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
						name: 'tem_multa',
						type: 'int',
						isNullable: true,
					},
				]
			});
		await queryRunner.createTable(table, true);

		const foreign_key_multa_estado = new TableForeignKey(
		{
			columnNames: ['tem_multa'],
			referencedColumnNames: ['id'],
			referencedTableName: 'estado_bool',
			onDelete: 'CASCADE'
		});

		const foreign_key_estudante_estado = new TableForeignKey(
		{
			columnNames: ['eh_estudante'],
			referencedColumnNames: ['id'],
			referencedTableName: 'estado_bool',
			onDelete: 'CASCADE'
		});

		await queryRunner.createForeignKeys('usuario', [foreign_key_multa_estado, 
			foreign_key_estudante_estado]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('usuario');
	}
}
