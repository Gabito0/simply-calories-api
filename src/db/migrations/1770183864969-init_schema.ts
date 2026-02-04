import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1770183864969 implements MigrationInterface {
    name = 'InitSchema1770183864969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_sex_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("user_id" uuid NOT NULL, "first_name" text, "last_name" text, "birth_date" date, "sex" "public"."user_profiles_sex_enum", "height_cm" integer, CONSTRAINT "PK_6ca9503d77ae39b4b5a6cc3ba88" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user_goals_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "calories_goal" numeric, "target_weight_goal_kg" numeric, "protein_goal_g" numeric, "fat_goal_g" numeric, "carbs_goal_g" numeric, "logged_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_9eb1dc65f39cde10af61d8b051d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_goals_entries_user_logged_at" ON "user_goals_entries" ("user_id", "logged_at") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "subject_identifier" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weight_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "weight_kg" numeric NOT NULL, "measured_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_31b8520819a1fde89cc47613dec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_weight_entries_user_measured_at" ON "weight_entries" ("user_id", "measured_at") `);
        await queryRunner.query(`CREATE TYPE "public"."food_items_serving_size_unit_enum" AS ENUM('g', 'ml', 'serving', 'peice')`);
        await queryRunner.query(`CREATE TABLE "food_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by_user_id" uuid, "barcode" text, "name" text NOT NULL, "brand" text, "serving_size_amount" numeric, "serving_size_unit" "public"."food_items_serving_size_unit_enum", "calories" numeric, "protein_g" numeric, "carbs_g" numeric, "fat_g" numeric, "source_ref" text, "source" text, CONSTRAINT "PK_6b37e62b21c674c714a581c59a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_food_items_created_by_user_id" ON "food_items" ("created_by_user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_food_items_barcode" ON "food_items" ("barcode") `);
        await queryRunner.query(`CREATE TYPE "public"."food_log_entries_meal_type_enum" AS ENUM('breakfast', 'lunch', 'dinner', 'snack')`);
        await queryRunner.query(`CREATE TYPE "public"."food_log_entries_unit_enum" AS ENUM('g', 'oz', 'ml', 'cup', 'serving', 'piece', 'slice', 'lb', 'fl_oz', 'tbsp', 'tsp')`);
        await queryRunner.query(`CREATE TABLE "food_log_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "food_item_id" uuid, "logged_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "meal_type" "public"."food_log_entries_meal_type_enum" NOT NULL, "quantity" numeric NOT NULL, "unit" "public"."food_log_entries_unit_enum" NOT NULL, "calories" numeric NOT NULL, "protein_g" numeric NOT NULL, "carbs_g" numeric NOT NULL, "fat_g" numeric NOT NULL, "grams" numeric, "milliliters" numeric, CONSTRAINT "PK_f8ee6bef6e66ccb7e66791cc1a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_food_log_entries_user_logged_at" ON "food_log_entries" ("user_id", "logged_at") `);
        await queryRunner.query(`CREATE TYPE "public"."exercises_exercise_type_enum" AS ENUM('strength', 'cardio', 'mobility')`);
        await queryRunner.query(`CREATE TYPE "public"."exercises_muscle_group_enum" AS ENUM('chest', 'triceps', 'biceps', 'forearms', 'legs', 'abs', 'glutes', 'shoulders', 'back')`);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "exercise_type" "public"."exercises_exercise_type_enum" NOT NULL, "muscle_group" "public"."exercises_muscle_group_enum", "created_by_user_id" uuid, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_exercise_created_by_user_id" ON "exercises" ("created_by_user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uq_exercise_creator_name" ON "exercises" ("created_by_user_id", "name") `);
        await queryRunner.query(`CREATE TABLE "exercise_diary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end_time" TIMESTAMP WITH TIME ZONE, "notes" text, CONSTRAINT "PK_2dc01f0ef5593ef37296e1fca55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_exercise_diary_user_start_time" ON "exercise_diary" ("user_id", "start_time") `);
        await queryRunner.query(`CREATE TABLE "exercise_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "exercise_diary_id" uuid NOT NULL, "logged_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "exercise_id" uuid NOT NULL, "reps" integer, "notes" text, "weight" numeric, "time_seconds" integer, "distance" numeric, CONSTRAINT "PK_fdf2b666f23d61679ba62472b45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_exercise_log_diary" ON "exercise_log" ("exercise_diary_id") `);
        await queryRunner.query(`CREATE INDEX "idx_exercise_log_user_logged_at" ON "exercise_log" ("user_id", "logged_at") `);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_goals_entries" ADD CONSTRAINT "FK_cef4a713e64a2e85b5235151a5b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weight_entries" ADD CONSTRAINT "FK_565a2952209d6cf8da209f6c9c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_items" ADD CONSTRAINT "FK_adc94fe47b1a116aeec54284328" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_log_entries" ADD CONSTRAINT "FK_bb15e397d3c8e315aaa0bbfbb9b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_log_entries" ADD CONSTRAINT "FK_8d77f984fc47d3c30bef192b266" FOREIGN KEY ("food_item_id") REFERENCES "food_items"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_2fa02a2953294ee753724bd1cfe" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_diary" ADD CONSTRAINT "FK_8bff0d26bde35c5d065406c5438" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_log" ADD CONSTRAINT "FK_1d5be3d4a698ba45e4fdd0b5aba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_log" ADD CONSTRAINT "FK_fd2a34b02dd438d904bd7a72baa" FOREIGN KEY ("exercise_diary_id") REFERENCES "exercise_diary"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_log" ADD CONSTRAINT "FK_19de927fe7a24f567899858e2dc" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_log" DROP CONSTRAINT "FK_19de927fe7a24f567899858e2dc"`);
        await queryRunner.query(`ALTER TABLE "exercise_log" DROP CONSTRAINT "FK_fd2a34b02dd438d904bd7a72baa"`);
        await queryRunner.query(`ALTER TABLE "exercise_log" DROP CONSTRAINT "FK_1d5be3d4a698ba45e4fdd0b5aba"`);
        await queryRunner.query(`ALTER TABLE "exercise_diary" DROP CONSTRAINT "FK_8bff0d26bde35c5d065406c5438"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_2fa02a2953294ee753724bd1cfe"`);
        await queryRunner.query(`ALTER TABLE "food_log_entries" DROP CONSTRAINT "FK_8d77f984fc47d3c30bef192b266"`);
        await queryRunner.query(`ALTER TABLE "food_log_entries" DROP CONSTRAINT "FK_bb15e397d3c8e315aaa0bbfbb9b"`);
        await queryRunner.query(`ALTER TABLE "food_items" DROP CONSTRAINT "FK_adc94fe47b1a116aeec54284328"`);
        await queryRunner.query(`ALTER TABLE "weight_entries" DROP CONSTRAINT "FK_565a2952209d6cf8da209f6c9c1"`);
        await queryRunner.query(`ALTER TABLE "user_goals_entries" DROP CONSTRAINT "FK_cef4a713e64a2e85b5235151a5b"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`);
        await queryRunner.query(`DROP INDEX "public"."idx_exercise_log_user_logged_at"`);
        await queryRunner.query(`DROP INDEX "public"."idx_exercise_log_diary"`);
        await queryRunner.query(`DROP TABLE "exercise_log"`);
        await queryRunner.query(`DROP INDEX "public"."idx_exercise_diary_user_start_time"`);
        await queryRunner.query(`DROP TABLE "exercise_diary"`);
        await queryRunner.query(`DROP INDEX "public"."uq_exercise_creator_name"`);
        await queryRunner.query(`DROP INDEX "public"."idx_exercise_created_by_user_id"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TYPE "public"."exercises_muscle_group_enum"`);
        await queryRunner.query(`DROP TYPE "public"."exercises_exercise_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_food_log_entries_user_logged_at"`);
        await queryRunner.query(`DROP TABLE "food_log_entries"`);
        await queryRunner.query(`DROP TYPE "public"."food_log_entries_unit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."food_log_entries_meal_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_food_items_barcode"`);
        await queryRunner.query(`DROP INDEX "public"."idx_food_items_created_by_user_id"`);
        await queryRunner.query(`DROP TABLE "food_items"`);
        await queryRunner.query(`DROP TYPE "public"."food_items_serving_size_unit_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_weight_entries_user_measured_at"`);
        await queryRunner.query(`DROP TABLE "weight_entries"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_goals_entries_user_logged_at"`);
        await queryRunner.query(`DROP TABLE "user_goals_entries"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_sex_enum"`);
    }

}
