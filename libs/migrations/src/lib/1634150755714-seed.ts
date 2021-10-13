import { MigrationInterface, QueryRunner } from "typeorm";
import {
  SECTOR_CHIEF, COMMERCIAL_DELEGATE,
  DELIVERER, SUPER_ADMIN,
} from '@merp/constants'
export class seed1634150755714 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
        INSERT INTO role (id, name) values
          (${SECTOR_CHIEF}, 'sector_chief'),
          (${DELIVERER}, 'deliverer'),
          (${SUPER_ADMIN}, 'super_admin'),
          (${COMMERCIAL_DELEGATE}, 'commercial_delegate')
    `)

    await queryRunner.query(`
      INSERT INTO
        users
        (
          "id",
          "first_name",
          "last_name",
          "email",
          "password",
          "roleId"
        )
        VALUES
        (
          '4f350dcf-bd41-4065-8102-1952e5050190',
          'erp',
          'admin',
          'admin@erp.com',
          '$2a$10$HcOZJfJVp2nTQtuM9Ny3UeAQnGobXw4qiuSSB8VO68/ITkK1utYf2',
          '${SUPER_ADMIN}'
        )
    `)

  }

  public async down(queryRunner: QueryRunner): Promise<void> { }

}
