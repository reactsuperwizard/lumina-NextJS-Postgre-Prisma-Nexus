/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Platform`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Platform.name_unique" ON "Platform"("name");
