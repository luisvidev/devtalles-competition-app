/*
  Warnings:

  - You are about to drop the column `userId` on the `Raffle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Raffle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_userId_fkey";

-- DropIndex
DROP INDEX "Raffle_userId_key";

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Raffle_authorId_key" ON "Raffle"("authorId");

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
