import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateScheduleTable1730000000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Schedule',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'execute_time',
            type: 'datetime',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'order_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Schedule',
      new TableForeignKey({
        name: 'fk_schedule_order_id',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Order',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Schedule', 'fk_schedule_order_id');
    await queryRunner.dropTable('Schedule');
  }
}
