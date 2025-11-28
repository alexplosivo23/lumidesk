-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "dueAt" TIMESTAMP(3),
ADD COLUMN     "sla" TEXT,
ADD COLUMN     "slaBreached" BOOLEAN NOT NULL DEFAULT false;
