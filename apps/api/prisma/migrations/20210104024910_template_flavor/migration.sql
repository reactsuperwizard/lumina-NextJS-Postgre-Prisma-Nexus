-- CreateEnum
CREATE TYPE "public"."TemplateFlavor" AS ENUM ('T4', 'T6');

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "flavor" "TemplateFlavor";
