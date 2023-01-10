-- CreateEnum
CREATE TYPE "public"."RenderStatus" AS ENUM ('rendering', 'queued', 'completed', 'errored');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('draft', 'submitted', 'inProgress', 'completed', 'cancelled');

-- CreateTable
CREATE TABLE "Render" (
"id" SERIAL,
    "queuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scriptId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "videoId" INTEGER,
    "progress" INTEGER,
    "error" TEXT,
    "status" "RenderStatus" NOT NULL DEFAULT E'queued',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT E'',
    "state" TEXT,
    "stripeId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "zip" TEXT,
"id" SERIAL,
    "subId" INTEGER,
    "userId" INTEGER,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "status" TEXT NOT NULL DEFAULT E'Unscheduled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
"id" SERIAL,
    "customerId" INTEGER NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "variables" TEXT,
"id" SERIAL,
    "orderId" INTEGER,
    "templateId" INTEGER,
    "videoId" INTEGER,
    "name" TEXT,
    "userId" INTEGER,
    "requestId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sub" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "liveVideoCap" INTEGER,
    "tier" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "yearlyVideoCap" INTEGER,
"id" SERIAL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL DEFAULT E'',
    "firstName" TEXT,
    "lastName" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
"id" SERIAL,
    "authId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
"id" SERIAL,
    "customerId" INTEGER,
    "orderId" INTEGER,
    "vimeoId" INTEGER,
    "requestId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maps" TEXT,
"id" SERIAL,
    "customerId" INTEGER,
    "example" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
    "publicId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
"id" SERIAL,
    "status" "RequestStatus" NOT NULL DEFAULT E'draft',
    "submittedAt" TIMESTAMP(3),
    "inProgressAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancelledReason" TEXT,
    "message" TEXT,
    "jobTitle" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" INTEGER,
    "customerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Render.videoId_unique" ON "Render"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.name_unique" ON "Customer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.subId_unique" ON "Customer"("subId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.slug_unique" ON "Customer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Order.name_unique" ON "Order"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Script.videoId_unique" ON "Script"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Script.name_unique" ON "Script"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Script.requestId_unique" ON "Script"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.authId_unique" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "Video.vimeoId_unique" ON "Video"("vimeoId");

-- CreateIndex
CREATE UNIQUE INDEX "Video.requestId_unique" ON "Video"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Template.name_unique" ON "Template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Asset.publicId_unique" ON "Asset"("publicId");

-- AddForeignKey
ALTER TABLE "Render" ADD FOREIGN KEY("scriptId")REFERENCES "Script"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Render" ADD FOREIGN KEY("videoId")REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD FOREIGN KEY("subId")REFERENCES "Sub"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY("customerId")REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD FOREIGN KEY("orderId")REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD FOREIGN KEY("requestId")REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD FOREIGN KEY("templateId")REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD FOREIGN KEY("videoId")REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD FOREIGN KEY("customerId")REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD FOREIGN KEY("orderId")REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD FOREIGN KEY("requestId")REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD FOREIGN KEY("customerId")REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY("customerId")REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY("orderId")REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
