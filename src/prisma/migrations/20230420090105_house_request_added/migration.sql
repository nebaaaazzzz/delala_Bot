-- CreateTable
CREATE TABLE `HouseRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subCity` VARCHAR(191) NOT NULL,
    `woredaOrSpecificPlace` VARCHAR(191) NOT NULL,
    `propertyType` VARCHAR(191) NOT NULL,
    `numberOfBedrooms` INTEGER NOT NULL,
    `numberOfBathrooms` INTEGER NOT NULL,
    `housePostType` ENUM('RENT', 'SALE') NOT NULL,
    `price` DOUBLE NOT NULL,
    `area` DOUBLE NOT NULL,
    `userTelegramID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HouseRequest` ADD CONSTRAINT `HouseRequest_userTelegramID_fkey` FOREIGN KEY (`userTelegramID`) REFERENCES `User`(`telegramId`) ON DELETE CASCADE ON UPDATE CASCADE;
