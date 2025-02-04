import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateItemVariantTable1731775263174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ItemVariant',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'item_id',
            type: 'int',
          },
          {
            name: 'option_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ItemVariant',
      new TableForeignKey({
        name: 'fk_item-variant_item_id',
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'OrderItem',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ItemVariant', 'fk_item-variant_item_id');
    await queryRunner.dropTable('ItemVariant');
  }
}
