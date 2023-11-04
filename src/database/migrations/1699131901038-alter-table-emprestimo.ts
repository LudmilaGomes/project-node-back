import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableEmprestimo1699131901038 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.addColumn(
			'emprestimo', new TableColumn({
        name: 'livro_devolvido',
        type: 'int',
        isNullable: false,
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropColumn('emprestimo', 'livro_devolvido');
	}
}
