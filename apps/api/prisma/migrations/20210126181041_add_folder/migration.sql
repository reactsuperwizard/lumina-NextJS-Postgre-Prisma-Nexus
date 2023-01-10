-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('image', 'video', 'audio', 'raw');

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "assetType" "AssetType" NOT NULL DEFAULT E'image',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "name" TEXT,
ADD COLUMN     "folderId" INTEGER;

-- CreateTable
CREATE TABLE "Folder" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
"id" SERIAL,
    "name" TEXT,
    "parentId" INTEGER,
    "customerTenant" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Folder" ADD FOREIGN KEY("parentId")REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD FOREIGN KEY("customerTenant")REFERENCES "Customer"("tenant") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD FOREIGN KEY("folderId")REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
