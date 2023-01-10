-- CreateTable
CREATE TABLE "MasterTemplate" (
    "id" SERIAL NOT NULL,
    "customerTenant" TEXT NOT NULL,
    "flavor" "TemplateFlavor" NOT NULL,
    "layers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MasterTemplate" ADD FOREIGN KEY ("customerTenant") REFERENCES "Customer"("tenant") ON DELETE CASCADE ON UPDATE CASCADE;
