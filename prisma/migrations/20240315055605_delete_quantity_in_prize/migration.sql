/*
  Warnings:

  - You are about to drop the column `quantity` on the `Prize` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prizeId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Prize" DROP COLUMN "quantity",
ADD COLUMN     "winnerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_prizeId_key" ON "Subscription"("prizeId");
