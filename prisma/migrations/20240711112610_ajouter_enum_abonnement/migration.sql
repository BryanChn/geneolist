/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_subscriptionId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `subscriptionId`,
    ADD COLUMN `subscription` ENUM('FREE', 'SUBSCRIBED') NOT NULL DEFAULT 'FREE';

-- DropTable
DROP TABLE `Subscription`;
