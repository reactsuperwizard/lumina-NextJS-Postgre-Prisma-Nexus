/*
  Warnings:

  - Made the column `status` on table `Order` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET NOT NULL;
