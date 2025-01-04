-- DropIndex
DROP INDEX `Engine_brandName_modelName_idx` ON `Engine`;

-- CreateIndex
CREATE INDEX `Engine_brandName_modelName_engineModelId_idx` ON `Engine`(`brandName`, `modelName`, `engineModelId`);

-- RenameIndex
ALTER TABLE `EngineModel` RENAME INDEX `EngineModel_engineTypeId_fkey` TO `EngineModel_engineTypeId_idx`;
