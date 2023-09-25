import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAutor1695597668928 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		// criamos uma nova tabela no banco de dados
		const table = new Table(
		{
			name: 'autor', // nome da tabela
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
					name: 'data_nasc',
					type: 'date',
					isNullable: false,
				},
				{
					name: 'nacionalidade',
					type: 'varchar',
					isNullable: false,
				}
			]
		})
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('autor');
	}
}
