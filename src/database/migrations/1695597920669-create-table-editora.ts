import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableEditora1695597920669 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
			{
				name:'editora',
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
						name: 'endereco',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'num_telefone',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'site',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'ano_fundacao',
						type: 'number',
						isNullable: false,
					}
				]
			}
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('editora');
	}
}
