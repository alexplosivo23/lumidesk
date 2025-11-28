-- CreateTable
CREATE TABLE "ApprovalFlow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ApprovalFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovalFlowStep" (
    "id" SERIAL NOT NULL,
    "flowId" INTEGER NOT NULL,
    "approverId" INTEGER NOT NULL,
    "stepOrder" INTEGER NOT NULL,

    CONSTRAINT "ApprovalFlowStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketApproval" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "comment" TEXT,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "TicketApproval_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApprovalFlowStep" ADD CONSTRAINT "ApprovalFlowStep_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "ApprovalFlow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalFlowStep" ADD CONSTRAINT "ApprovalFlowStep_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketApproval" ADD CONSTRAINT "TicketApproval_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketApproval" ADD CONSTRAINT "TicketApproval_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ApprovalFlowStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
