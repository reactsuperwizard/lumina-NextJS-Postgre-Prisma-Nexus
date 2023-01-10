/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[hsCompanyId]` on the table `Customer`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[hsContactId]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "hsCompanyId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hsContactId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Customer.hsCompanyId_unique" ON "Customer"("hsCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "User.hsContactId_unique" ON "User"("hsContactId");
