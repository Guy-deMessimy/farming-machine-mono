/*
  Warnings:

  - You are about to drop the column `typeId` on the `Engine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Engine` DROP FOREIGN KEY `Engine_typeId_fkey`;

-- AlterTable
ALTER TABLE `Engine` DROP COLUMN `typeId`,
    ADD COLUMN `engineTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Engine` ADD CONSTRAINT `Engine_engineTypeId_fkey` FOREIGN KEY (`engineTypeId`) REFERENCES `EngineTypes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
