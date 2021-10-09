import { MigrationInterface, QueryRunner } from "typeorm";

export class seed1617183492380 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
        INSERT INTO role (id, name) values
          (2, 'sector_chief'),
          (1, 'deliverer')
    `)

    // await queryRunner.query(`
    //   INSERT INTO
    //     users
    //     (
    //       "id",
    //       "first_name",
    //       "last_name",
    //       "user_name",
    //       "email",
    //       "password",
    //       "phonenumber",
    //       "language",
    //       "roleId"
    //     )
    //     VALUES
    //     (
    //       '9aea1757-c2cd-4079-98a0-d7233f082b1f',
    //       'john',
    //       'doe',
    //       'john.doe',
    //       'john@doe.com',
    //       '$2b$10$F6yUtueg0j3Uzw0CsqREqefPvivNX.26CIM9rtzSu.UdrENmRiuzm',
    //       '650963055',
    //       'en',
    //       6
    //     )
    // `)

  }

  public async down(queryRunner: QueryRunner): Promise<void> { }

}
