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
            name: 'name_en',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'description_en',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true,
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
      'OrderItem',
      new TableForeignKey({
        name: 'fk_order-item_menu_id',
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Menu',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('OrderItem', 'fk_order-item_menu_id');
    await queryRunner.dropTable('Menu');
  }
}
