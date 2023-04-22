/*
  Warnings:

  - You are about to alter the column `area` on the `House` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `area` on the `HouseRequest` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `House` MODIFY `area` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `HouseRequest` MODIFY `area` VARCHAR(191) NOT NULL;
