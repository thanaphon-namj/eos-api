import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItemTable1731775255982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OrderItem',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'variant',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'price',
            type: 'double',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'total',
            type: 'double',
          },
          {
            name: 'order_id',
            type: 'int',
          },
          // {
          //   name: 'menu_id',
          //   type: 'int',
          // },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'OrderItem',
      new TableForeignKey({
        name: 'fk_order-item_order_id',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Order',
        onDelete: 'CASCADE',
      }),
    );

    // await queryRunner.createForeignKey(
    //   'OrderItem',
    //   new TableForeignKey({
    //     name: 'fk_order-item_menu_id',
    //     columnNames: ['menu_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'Menu',
    //     onDelete: 'CASCADE',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('OrderItem', 'fk_order-item_order_id');
    // await queryRunner.dropForeignKey('OrderItem', 'fk_order-item_menu_id');
    await queryRunner.dropTable('OrderItem');
  }
}
