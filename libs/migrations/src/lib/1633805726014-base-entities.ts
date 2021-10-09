import {MigrationInterface, QueryRunner} from "typeorm";

export class baseEntities1633805726014 implements MigrationInterface {
    name = 'baseEntities1633805726014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_sex_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "disabled" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "first_name" character varying, "last_name" character varying, "sex" "public"."users_sex_enum", "email" character varying, "adress" character varying NOT NULL, "phonenumber" character varying NOT NULL, "language" character varying NOT NULL DEFAULT 'fr', "is_retailer" boolean, "company_name" character varying, "password" character varying, "otp" character varying, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_sex_enum"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
