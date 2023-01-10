/*
  Warnings:

  - You are about to drop the column `customerTenant` on the `MasterTemplate` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[customerId,flavor]` on the table `MasterTemplate`. If there are existing duplicate values, the migration will fail.
  - Added the required column `customerId` to the `MasterTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MasterTemplate" DROP CONSTRAINT "MasterTemplate_customerTenant_fkey";

-- DropIndex
DROP INDEX "MasterTemplate.customerTenant_flavor_unique";

-- AlterTable
ALTER TABLE "MasterTemplate" DROP COLUMN "customerTenant",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MasterTemplate.customerId_flavor_unique" ON "MasterTemplate"("customerId", "flavor");

-- AddForeignKey
ALTER TABLE "MasterTemplate" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
