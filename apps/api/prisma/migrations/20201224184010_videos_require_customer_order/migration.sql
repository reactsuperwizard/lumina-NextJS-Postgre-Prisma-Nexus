/*
  Warnings:

  - Made the column `orderId` on table `Video` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `customerTenant` on table `Video` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "customerTenant" SET NOT NULL;
