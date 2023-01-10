-- CreateEnum
CREATE TYPE "RequestLogsEvent" AS ENUM ('RequestSubmitted', 'RequestAccepted', 'RequestReturnedToQueue', 'VideoAddedToRenderQueue', 'RenderFailed', 'RenderCompleted', 'VideoPublished', 'CustomerRequestEdits');

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "basePrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bonusPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bonusDeadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "RequestLog" (
    "id" SERIAL NOT NULL,
    "event" "RequestLogsEvent" NOT NULL,
    "requestId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestLog" ADD FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestLog" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
