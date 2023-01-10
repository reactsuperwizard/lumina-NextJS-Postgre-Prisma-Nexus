/*
  Warnings:

  - The migration will remove the values [VideoAddedToRenderQueue] on the enum `RequestLogsEvent`. If these variants are still used in the database, the migration will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestLogsEvent_new" AS ENUM ('RequestSubmitted', 'RequestAccepted', 'RequestReturnedToQueue', 'ScriptAddedToRenderQueue', 'AllEditsDeleted', 'RenderFailed', 'RenderCompleted', 'VideoPublished', 'CustomerRequestEdits');
ALTER TABLE "public"."RequestLog" ALTER COLUMN "event" TYPE "RequestLogsEvent_new" USING ("event"::text::"RequestLogsEvent_new");
ALTER TYPE "RequestLogsEvent" RENAME TO "RequestLogsEvent_old";
ALTER TYPE "RequestLogsEvent_new" RENAME TO "RequestLogsEvent";
DROP TYPE "RequestLogsEvent_old";
COMMIT;
