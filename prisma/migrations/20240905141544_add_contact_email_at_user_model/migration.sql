-- AlterTable
ALTER TABLE `user` ADD COLUMN `contactEmail` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;
