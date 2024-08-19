/*
  Warnings:

  - You are about to drop the column `CopiesNumber` on the `Engine` table. All the data in the column will be lost.
  - You are about to drop the column `MaxKmhSpeed` on the `Engine` table. All the data in the column will be lost.
  - You are about to drop the column `PetrolLitreTank` on the `Engine` table. All the data in the column will be lost.
  - You are about to drop the column `TankLitre` on the `Engine` table. All the data in the column will be lost.
  - You are about to drop the column `WeightKg` on the `Engine` table. All the data in the column will be lost.
  - You are about to drop the column `WorkingWidth` on the `Engine` table. All the data in the column will be lost.
  - Added the required column `copiesNumber` to the `Engine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxKmhSpeed` to the `Engine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petrolLitreTank` to the `Engine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightKg` to the `Engine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Engine` DROP COLUMN `CopiesNumber`,
    DROP COLUMN `MaxKmhSpeed`,
    DROP COLUMN `PetrolLitreTank`,
    DROP COLUMN `TankLitre`,
    DROP COLUMN `WeightKg`,
    DROP COLUMN `WorkingWidth`,
    ADD COLUMN `copiesNumber` INTEGER NOT NULL,
    ADD COLUMN `maxKmhSpeed` INTEGER NOT NULL,
    ADD COLUMN `petrolLitreTank` INTEGER NOT NULL,
    ADD COLUMN `tankLitre` INTEGER NULL,
    ADD COLUMN `weightKg` INTEGER NOT NULL,
    ADD COLUMN `workingWidth` INTEGER NULL;
