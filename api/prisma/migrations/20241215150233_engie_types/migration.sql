/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Engine` DROP FOREIGN KEY `Engine_typeId_fkey`;

-- DropTable
DROP TABLE `Type`;

-- CreateTable
CREATE TABLE `EngineTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Engine` ADD CONSTRAINT `Engine_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `EngineTypes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
