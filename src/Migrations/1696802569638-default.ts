import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696802569638 implements MigrationInterface {
    name = 'Default1696802569638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "LastUpdatedDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "Name" character varying(255) NOT NULL, "Email" character varying(255) NOT NULL, "Password" text NOT NULL, "BirthDay" TIMESTAMP WITH TIME ZONE, "Sex" character varying(255), "Role" character varying(255), CONSTRAINT "UQ_884fdf47515c24dbbf6d89c2d84" UNIQUE ("Email"), CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
