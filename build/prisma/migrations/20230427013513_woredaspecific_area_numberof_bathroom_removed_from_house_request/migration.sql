/*
  Warnings:

  - You are about to drop the column `area` on the `HouseRequest` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfBathrooms` on the `HouseRequest` table. All the data in the column will be lost.
  - You are about to drop the column `woredaOrSpecificPlace` on the `HouseRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `HouseRequest` DROP COLUMN `area`,
    DROP COLUMN `numberOfBathrooms`,
    DROP COLUMN `woredaOrSpecificPlace`;
