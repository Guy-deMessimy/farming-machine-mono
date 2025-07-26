/*
  Warnings:

  - The primary key for the `ApiKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ApiKey` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `A` on the `_ApiKeyPermissions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[uuid]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `ApiKey` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `_ApiKeyPermissions` DROP FOREIGN KEY `_ApiKeyPermissions_A_fkey`;

-- AlterTable
ALTER TABLE `ApiKey` DROP PRIMARY KEY,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_ApiKeyPermissions` MODIFY `A` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ApiKey_uuid_key` ON `ApiKey`(`uuid`);

-- AddForeignKey
ALTER TABLE `_ApiKeyPermissions` ADD CONSTRAINT `_ApiKeyPermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `ApiKey`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
