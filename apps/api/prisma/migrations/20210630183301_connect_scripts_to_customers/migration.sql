-- AlterTable
ALTER TABLE "Script" ADD COLUMN     "customerTenant" TEXT;

-- AddForeignKey
ALTER TABLE "Script" ADD FOREIGN KEY ("customerTenant") REFERENCES "Customer"("tenant") ON DELETE SET NULL ON UPDATE CASCADE;
