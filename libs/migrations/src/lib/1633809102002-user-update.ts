import {MigrationInterface, QueryRunner} from "typeorm";

export class userUpdate1633809102002 implements MigrationInterface {
    name = 'userUpdate1633809102002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sex"`);
        await queryRunner.query(`DROP TYPE "public"."users_sex_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adress"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phonenumber"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_retailer"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "otp" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "company_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_retailer" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "language" character varying NOT NULL DEFAULT 'fr'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phonenumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "adress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."users_sex_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sex" "public"."users_sex_enum"`);
    }

}
