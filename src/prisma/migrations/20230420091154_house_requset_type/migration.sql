/*
  Warnings:

  - You are about to drop the column `housePostType` on the `HouseRequest` table. All the data in the column will be lost.
  - Added the required column `houseRequestType` to the `HouseRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HouseRequest` DROP COLUMN `housePostType`,
    ADD COLUMN `houseRequestType` ENUM('RENT', 'SALE') NOT NULL;
