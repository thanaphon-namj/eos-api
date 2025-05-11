import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMenuOptionTable1730000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MenuOption',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'is_required',
            type: 'boolean',
            default: false,
          },
          {
            name: 'allow_multiple',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MenuOption');
  }
}
