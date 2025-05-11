import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMenuCategoryTable1730000000009
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MenuCategory',
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
            name: 'image_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'banner_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'int',
          },
          {
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Menu',
      new TableForeignKey({
        name: 'fk_menu_category_id',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'MenuCategory',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'MenuCategory',
      new TableForeignKey({
        name: 'fk_menu-category_parent_id',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'MenuCategory',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Menu', 'fk_menu_category_id');
    await queryRunner.dropForeignKey(
      'MenuCategory',
      'fk_menu-category_parent_id',
    );
    await queryRunner.dropTable('MenuCategory');
  }
}
