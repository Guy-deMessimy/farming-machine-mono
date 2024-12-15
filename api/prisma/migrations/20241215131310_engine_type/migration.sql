/*
  Warnings:

  - You are about to drop the `_ServiceToType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ServiceToType` DROP FOREIGN KEY `_ServiceToType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ServiceToType` DROP FOREIGN KEY `_ServiceToType_B_fkey`;

-- DropTable
DROP TABLE `_ServiceToType`;
