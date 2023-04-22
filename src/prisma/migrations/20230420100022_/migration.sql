/*
  Warnings:

  - The values [SALE] on the enum `HouseRequest_houseRequestType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `HouseRequest` MODIFY `houseRequestType` ENUM('RENT', 'BUY') NOT NULL;
