import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderTable1730000000002 implements MigrationInterface {
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
            name: 'code',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '30',
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
            name: 'admin_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Order',
      new TableForeignKey({
        name: 'fk_order_admin_id',
        columnNames: ['admin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Admin',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Order', 'fk_order_admin_id');
    await queryRunner.dropTable('Order');
  }
}
