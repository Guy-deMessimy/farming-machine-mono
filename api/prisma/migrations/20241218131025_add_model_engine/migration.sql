/*
  Warnings:

  - You are about to drop the column `engineTypeId` on the `Engine` table. All the data in the column will be lost.
  - Added the required column `engineModelId` to the `Engine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Engine` DROP FOREIGN KEY `Engine_engineTypeId_fkey`;

-- AlterTable
ALTER TABLE `Engine` DROP COLUMN `engineTypeId`,
    ADD COLUMN `engineModelId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `EngineModel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,
    `engineTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EngineModel` ADD CONSTRAINT `EngineModel_engineTypeId_fkey` FOREIGN KEY (`engineTypeId`) REFERENCES `EngineTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engine` ADD CONSTRAINT `Engine_engineModelId_fkey` FOREIGN KEY (`engineModelId`) REFERENCES `EngineModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
