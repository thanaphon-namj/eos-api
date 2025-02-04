import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMenuOptionTable1731775418320 implements MigrationInterface {
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
            name: 'additional_price',
            type: 'double',
            default: 0,
          },
          {
            name: 'group_name',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'is_active',
            type: 'boolean',
          },
          {
            name: 'menu_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ItemVariant',
      new TableForeignKey({
        name: 'fk_item-variant_option_id',
        columnNames: ['option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'MenuOption',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'MenuOption',
      new TableForeignKey({
        name: 'fk_menu-option_menu_id',
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Menu',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ItemVariant',
      'fk_item-variant_option_id',
    );
    await queryRunner.dropForeignKey('MenuOption', 'fk_menu-option_menu_id');
    await queryRunner.dropTable('MenuOption');
  }
}
