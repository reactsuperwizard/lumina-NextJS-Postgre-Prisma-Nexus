/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[videoId]` on the table `Request`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "ownerId" INTEGER,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "name" TEXT,
ALTER COLUMN "orderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Request_videoId_unique" ON "Request"("videoId");

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY("ownerId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
