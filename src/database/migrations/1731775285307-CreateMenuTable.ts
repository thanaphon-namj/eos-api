import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMenuTable1731775285307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Menu',
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
            length: '30',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'double',
          },
          {
            name: 'is_active',
            type: 'boolean',
          },
          {
            name: 'category_id',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Menu', 'fk_menu_category_id');
    await queryRunner.dropTable('Menu');
  }
}
