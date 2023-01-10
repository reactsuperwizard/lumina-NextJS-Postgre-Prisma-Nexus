-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasFreeRequest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "freeRequestId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("freeRequestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
