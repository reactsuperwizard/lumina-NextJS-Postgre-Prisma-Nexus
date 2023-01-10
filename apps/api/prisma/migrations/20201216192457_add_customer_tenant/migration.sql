/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[tenant]` on the table `Customer`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "tenant" TEXT;

UPDATE "Customer" SET "tenant" = "slug";
ALTER TABLE "Customer" ALTER COLUMN     "tenant" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer.tenant_unique" ON "Customer"("tenant");
