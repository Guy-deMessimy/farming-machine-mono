/*
  Warnings:

  - You are about to drop the column `title` on the `Type` table. All the data in the column will be lost.
  - Added the required column `name` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Type` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
