-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `value` LONGTEXT NOT NULL,

    UNIQUE INDEX `Session_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `telegramId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `userType` ENUM('BROKER', 'HOME_SEEKER') NOT NULL,
    `language` ENUM('EN', 'AM') NOT NULL DEFAULT 'EN',
    `phoneNumber` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_telegramId_key`(`telegramId`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`telegramId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `House` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subCity` VARCHAR(191) NOT NULL,
    `woredaOrSpecificPlace` VARCHAR(191) NOT NULL,
    `propertyType` VARCHAR(191) NOT NULL,
    `numberOfBedrooms` INTEGER NOT NULL,
    `numberOfBathrooms` INTEGER NOT NULL,
    `housePostType` ENUM('RENT', 'SALE') NOT NULL,
    `price` DOUBLE NOT NULL,
    `area` DOUBLE NOT NULL,
    `status` ENUM('APPROVED', 'PENDING', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `userTelegramID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `houseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_userTelegramID_fkey` FOREIGN KEY (`userTelegramID`) REFERENCES `User`(`telegramId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseImage` ADD CONSTRAINT `HouseImage_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
