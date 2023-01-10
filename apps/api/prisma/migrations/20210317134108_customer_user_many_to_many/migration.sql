/*
  Warnings:

  - You are about to drop the column `userId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserCustomerRelationship" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserCustomerRelationship_AB_unique" ON "_UserCustomerRelationship"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCustomerRelationship_B_index" ON "_UserCustomerRelationship"("B");

-- AddForeignKey
ALTER TABLE "_UserCustomerRelationship" ADD FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCustomerRelationship" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
