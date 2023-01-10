ALTER TYPE "RequestStatus" RENAME TO "OldRequestStatus";

CREATE TYPE "NewRequestStatus" AS ENUM ('draft', 'submitted', 'scripting', 'completed', 'cancelled', 'queued', 'rendering', 'qa', 'final');

ALTER TABLE "Request"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status"
    SET DATA TYPE "NewRequestStatus"
    USING (
      CASE "status"::text
        WHEN 'inProgress' THEN 'scripting'
        ELSE "status"::text
      END
    )::"NewRequestStatus",
  ALTER COLUMN "status" SET DEFAULT 'draft';

DROP TYPE "OldRequestStatus";

ALTER TYPE "NewRequestStatus" RENAME TO "RequestStatus";
