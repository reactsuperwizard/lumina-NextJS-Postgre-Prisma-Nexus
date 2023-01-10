/*
  Warnings:

  - You are about to drop the column `videoId` on the `Request` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[requestId]` on the table `Video`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "Request_videoId_unique";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_videoId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "videoId";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "requestId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Video_requestId_unique" ON "Video"("requestId");

-- AddForeignKey
ALTER TABLE "Video" ADD FOREIGN KEY("requestId")REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
