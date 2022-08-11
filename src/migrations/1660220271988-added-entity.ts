import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1660220271988 implements MigrationInterface {
    name = 'addedEntity1660220271988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "pricePerUnit" integer NOT NULL, "totalPrice" integer NOT NULL, "deliveryAddress" character varying NOT NULL, "orderStatus" character varying NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
