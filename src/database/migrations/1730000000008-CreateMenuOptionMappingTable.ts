import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMenuOptionMappingTable1730000000008
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MenuOptionMapping',
        columns: [
          {
            name: 'menu_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'option_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'MenuOptionMapping',
      new TableForeignKey({
        name: 'fk_menu-option-mapping_menu_id',
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Menu',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'MenuOptionMapping',
      new TableForeignKey({
        name: 'fk_menu-option-mapping_option_id',
        columnNames: ['option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'MenuOption',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'MenuOptionMapping',
      'fk_menu-option-mapping_menu_id',
    );
    await queryRunner.dropForeignKey(
      'MenuOptionMapping',
      'fk_menu-option-mapping_option_id',
    );
    await queryRunner.dropTable('MenuOptionMapping');
  }
}
