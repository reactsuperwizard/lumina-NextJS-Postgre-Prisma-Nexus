/*
  Warnings:

  - You are about to alter the column `status` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `String` to `Enum("VideoStatus")`.

*/
-- CreateEnum
CREATE TYPE "public"."VideoStatus" AS ENUM ('pending', 'live');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN "publishedAt" TIMESTAMP(3);
ALTER TABLE "Video" DROP COLUMN "status", 
  ADD COLUMN "status" "VideoStatus" DEFAULT E'pending';

