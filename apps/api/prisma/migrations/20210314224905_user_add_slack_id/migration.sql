/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[slackId]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "slackId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User.slackId_unique" ON "User"("slackId");
