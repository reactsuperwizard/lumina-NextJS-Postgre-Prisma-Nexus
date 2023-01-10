-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerTenant" TEXT;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "customerTenant" TEXT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "customerTenant" TEXT;
