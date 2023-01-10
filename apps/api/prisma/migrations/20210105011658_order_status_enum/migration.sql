/*
  Warnings:

  - You are about to alter the column `status` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Enum("OrderStatus")`.

*/

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('inProgress', 'completed');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN "status" "OrderStatus" DEFAULT E'inProgress';
