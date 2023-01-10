/*
  Warnings:

  - You are about to drop the column `displayFilter` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `displayAcademy` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "displayFilter",
DROP COLUMN "displayAcademy";
