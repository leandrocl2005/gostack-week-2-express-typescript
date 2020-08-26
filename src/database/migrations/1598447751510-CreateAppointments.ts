import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { query } from 'express';

export default class CreateAppointments1598447751510
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'varchar',
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'vachar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with timezone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
