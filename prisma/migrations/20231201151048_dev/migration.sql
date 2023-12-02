/*
  Warnings:

  - You are about to drop the `Activities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Activities`;

-- CreateTable
CREATE TABLE `ActivitySet` (
    `id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `groupType` ENUM('SOLO', 'COUPLE', 'FRIENDS', 'FAMILY', 'BUSINESS') NOT NULL,
    `daysNumber` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `activities` JSON NOT NULL,
    `image` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ActivitySet_city_country_groupType_daysNumber_key`(`city`, `country`, `groupType`, `daysNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
