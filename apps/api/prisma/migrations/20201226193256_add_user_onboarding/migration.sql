-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboarding" JSONB;
