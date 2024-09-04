/*
  Warnings:

  - You are about to drop the column `image` on the `manga` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `manga` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image` VARCHAR(191) NULL;
