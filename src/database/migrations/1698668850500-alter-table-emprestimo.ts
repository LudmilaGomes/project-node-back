import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableEmprestimo1698668850500 implements MigrationInterface 
{
	public async up(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.changeColumn(
      'emprestimo', 'data_realizacao',
      new TableColumn({
        name: 'data_realizacao',
        type: 'date',
        isNullable: false,
      })
    );

		await queryRunner.changeColumn(
      'emprestimo', 'data_devolucao',
      new TableColumn({
        name: 'data_devolucao',
        type: 'date',
        isNullable: false,
      })
    );
	}

	public async down(queryRunner: QueryRunner): Promise<void> 
	{
		await queryRunner.changeColumn(
      'emprestimo', 'data_devolucao',
      new TableColumn({
        name: 'data_devolucao',
        type: 'int',
        isNullable: false,
      })
    );
		
		await queryRunner.changeColumn(
      'emprestimo', 'data_devolucao',
      new TableColumn({
        name: 'data_devolucao',
        type: 'int',
        isNullable: false,
      })
    );
	}
}
