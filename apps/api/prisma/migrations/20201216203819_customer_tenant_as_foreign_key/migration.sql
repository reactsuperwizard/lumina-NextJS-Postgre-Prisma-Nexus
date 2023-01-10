/*
  Warnings:

  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Video` table. All the data in the column will be lost.
  - Made the column `customerTenant` on table `Order` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `customerTenant` on table `Request` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_customerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId",
ALTER COLUMN "customerTenant" SET NOT NULL;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "customerId",
ALTER COLUMN "customerTenant" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "customerId";

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY("customerTenant")REFERENCES "Customer"("tenant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY("customerTenant")REFERENCES "Customer"("tenant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD FOREIGN KEY("customerTenant")REFERENCES "Customer"("tenant") ON DELETE SET NULL ON UPDATE CASCADE;
