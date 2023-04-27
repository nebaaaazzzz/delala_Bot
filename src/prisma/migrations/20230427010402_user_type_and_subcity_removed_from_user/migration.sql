/*
  Warnings:

  - You are about to drop the column `subCity` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `subCity`,
    DROP COLUMN `userType`;
