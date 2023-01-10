-- AlterTable
ALTER TABLE "Script" ADD COLUMN     "layers" JSONB NOT NULL DEFAULT 'false',
ADD COLUMN     "globals" JSONB NOT NULL DEFAULT 'false',
ADD COLUMN     "slides" JSONB NOT NULL DEFAULT 'false';

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "layers" JSONB NOT NULL DEFAULT 'false',
ADD COLUMN     "globals" JSONB NOT NULL DEFAULT 'false',
ADD COLUMN     "slides" JSONB NOT NULL DEFAULT 'false';
