/*
  Warnings:

  - You are about to drop the column `requestId` on the `Video` table. All the data in the column will be lost.
  - Made the column `orderId` on table `Request` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `Request` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `requestId` on table `Script` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Video_requestId_unique";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_requestId_fkey";

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "videoId" INTEGER,
ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Script" ALTER COLUMN "requestId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "requestId";

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY("videoId")REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
