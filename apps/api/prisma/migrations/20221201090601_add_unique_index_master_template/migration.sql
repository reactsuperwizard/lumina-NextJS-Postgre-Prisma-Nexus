/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[customerTenant,flavor]` on the table `MasterTemplate`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MasterTemplate.customerTenant_flavor_unique" ON "MasterTemplate"("customerTenant", "flavor");
