/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `subCity` VARCHAR(191) NULL,
    ADD COLUMN `telegramFirstName` VARCHAR(191) NULL,
    ADD COLUMN `telegramLastName` VARCHAR(191) NULL;
