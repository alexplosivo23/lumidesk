-- DropForeignKey
ALTER TABLE "TicketApproval" DROP CONSTRAINT "TicketApproval_stepId_fkey";

-- AlterTable
ALTER TABLE "TicketApproval" ALTER COLUMN "stepId" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "TicketApproval" ADD CONSTRAINT "TicketApproval_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ApprovalFlowStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;
