-- CreateTable
CREATE TABLE `Death` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `dateDeath` DATETIME(3) NOT NULL,
    `dateBirth` DATETIME(3) NOT NULL,
    `town` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `sexe` VARCHAR(191) NOT NULL,
    `parents` VARCHAR(191) NOT NULL,
    `marriedName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
