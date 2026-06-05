/*
  Warnings:

  - You are about to drop the column `massageId` on the `Fragment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId]` on the table `Fragment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `Fragment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('RESULT', 'ERROR');

-- DropForeignKey
ALTER TABLE "Fragment" DROP CONSTRAINT "Fragment_massageId_fkey";

-- DropIndex
DROP INDEX "Fragment_massageId_key";

-- AlterTable
ALTER TABLE "Fragment" DROP COLUMN "massageId",
ADD COLUMN     "messageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "type",
ADD COLUMN     "type" "MessageType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fragment_messageId_key" ON "Fragment"("messageId");

-- AddForeignKey
ALTER TABLE "Fragment" ADD CONSTRAINT "Fragment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
