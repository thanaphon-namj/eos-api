import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMenuOptionChoiceTable1730000000007
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MenuOptionChoice',
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
            name: 'additional_price',
            type: 'double',
          },
          {
            name: 'is_default',
            type: 'boolean',
            default: false,
          },
          {
            name: 'option_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'OrderItemChoice',
      new TableForeignKey({
        name: 'fk_order-item-choice_choice_id',
        columnNames: ['choice_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'MenuOptionChoice',
      }),
    );
    await queryRunner.createForeignKey(
      'MenuOptionChoice',
      new TableForeignKey({
        name: 'fk_menu-option-choice_option_id',
        columnNames: ['option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'MenuOption',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'OrderItemChoice',
      'fk_order-item-choice_choice_id',
    );
    await queryRunner.dropForeignKey(
      'MenuOptionChoice',
      'fk_menu-option-choice_option_id',
    );
    await queryRunner.dropTable('MenuOptionChoice');
  }
}
