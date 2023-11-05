import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

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
		
		const estado_bool_fk = new TableForeignKey(
			{
				columnNames: ['livro_devolvido'],
				referencedColumnNames: ['id'],
				referencedTableName: 'estado_bool',
				onDelete: 'CASCADE'
			});

		await queryRunner.createForeignKey('emprestimo', estado_bool_fk);
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.dropForeignKey('emprestimo', 'livro_devolvido');
		await queryRunner.dropColumn('emprestimo', 'livro_devolvido');
	}
}
