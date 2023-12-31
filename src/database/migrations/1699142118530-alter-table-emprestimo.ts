import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableEmprestimo1699142118530 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.addColumn(
			'emprestimo', new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropColumn('emprestimo', 'status');
	}
}