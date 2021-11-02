import {MigrationInterface, QueryRunner} from "typeorm";

export class baseEntities1635768180739 implements MigrationInterface {
    name = 'baseEntities1635768180739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_status"`);
        await queryRunner.query(`CREATE TYPE "public"."order_order_status_enum" AS ENUM('created', 'checking', 'checked', 'canceled', 'is_billed', 'settled_bill', 'consigned_bill')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_status" "public"."order_order_status_enum" NOT NULL DEFAULT 'created'`);
    }

}
