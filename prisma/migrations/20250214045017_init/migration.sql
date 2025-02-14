-- CreateTable
CREATE TABLE `Referral` (
    `id` VARCHAR(191) NOT NULL,
    `referrerName` VARCHAR(191) NOT NULL,
    `referrerEmail` VARCHAR(191) NOT NULL,
    `referredName` VARCHAR(191) NOT NULL,
    `referredEmail` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Referral_referrerEmail_key`(`referrerEmail`),
    UNIQUE INDEX `Referral_referredEmail_key`(`referredEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
