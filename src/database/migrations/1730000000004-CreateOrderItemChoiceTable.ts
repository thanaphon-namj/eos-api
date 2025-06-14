import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItemChoiceTable1730000000004
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OrderItemChoice',
        columns: [
          {
            name: 'item_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'choice_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'OrderItemChoice',
      new TableForeignKey({
        name: 'fk_order-item-choice_item_id',
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'OrderItem',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'OrderItemChoice',
      'fk_order-item-choice_item_id',
    );
    await queryRunner.dropTable('OrderItemChoice');
  }
}
