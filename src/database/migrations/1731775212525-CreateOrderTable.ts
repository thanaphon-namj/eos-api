import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderTable1731775212525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Order',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'reference_code',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'subtotal',
            type: 'double',
            default: 0,
          },
          {
            name: 'discount',
            type: 'double',
            default: 0,
          },
          {
            name: 'total',
            type: 'double',
            default: 0,
          },
          {
            name: 'payment',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'created_at',
            type: 'datetime',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'seller_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Order',
      new TableForeignKey({
        name: 'fk_order_user_seller_id',
        columnNames: ['seller_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Order', 'fk_order_user_seller_id');
    await queryRunner.dropTable('Order');
  }
}
