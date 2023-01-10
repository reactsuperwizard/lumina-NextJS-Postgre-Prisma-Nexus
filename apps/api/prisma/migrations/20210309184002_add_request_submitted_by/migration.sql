/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[customerTenant]` on the table `Folder`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "submittedById" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_customerTenant_unique" ON "Folder"("customerTenant");

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
