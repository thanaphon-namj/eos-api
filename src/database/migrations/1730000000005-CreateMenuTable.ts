import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMenuTable1730000000005 implements MigrationInterface {
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
            name: 'image_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'double',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'is_recommended',
            type: 'boolean',
            default: false,
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
