import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableEstadoBool1697295122336 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		const table = new Table(
			{
				name: "estado_bool",
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isNullable: false,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'nome',
						type: 'varchar',
						isNullable: false,
					}
				]
		});

		queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropTable('estado_bool');
	}
}
