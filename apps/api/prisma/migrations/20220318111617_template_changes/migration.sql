-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "approvedTemplates" "TemplateFlavor"[];

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "template" "TemplateFlavor";
