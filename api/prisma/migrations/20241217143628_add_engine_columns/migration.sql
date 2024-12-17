-- AlterTable
ALTER TABLE `Engine` ADD COLUMN `autonomyMn` INTEGER NULL,
    ADD COLUMN `description` LONGTEXT NULL,
    ADD COLUMN `liftingHeightMeter` INTEGER NULL,
    ADD COLUMN `ref` VARCHAR(191) NULL,
    MODIFY `conception` VARCHAR(191) NULL,
    MODIFY `engineKwPower` INTEGER NULL,
    MODIFY `engineCcPower` INTEGER NULL,
    MODIFY `maxKmhSpeed` INTEGER NULL,
    MODIFY `petrolLitreTank` INTEGER NULL,
    MODIFY `weightKg` INTEGER NULL;
