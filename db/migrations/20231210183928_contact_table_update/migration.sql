/*
  Warnings:

  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "userId",
ADD COLUMN     "name" TEXT,
ALTER COLUMN "message" DROP NOT NULL;
