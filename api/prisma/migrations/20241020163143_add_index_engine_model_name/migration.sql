-- DropIndex
DROP INDEX `Engine_brandName_idx` ON `Engine`;

-- CreateIndex
CREATE INDEX `Engine_brandName_modelName_idx` ON `Engine`(`brandName`, `modelName`);
