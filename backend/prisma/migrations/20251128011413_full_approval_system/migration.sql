/*
  Warnings:

  - You are about to drop the column `active` on the `ApprovalFlow` table. All the data in the column will be lost.
  - You are about to drop the column `slaBreached` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `categoryId` on table `ApprovalFlow` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ticketId_fkey";

-- AlterTable
ALTER TABLE "ApprovalFlow" DROP COLUMN "active",
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "slaBreached",
DROP COLUMN "updatedAt",
ALTER COLUMN "priority" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TicketApproval" ADD COLUMN     "approverId" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "Comment";

-- AddForeignKey
ALTER TABLE "ApprovalFlow" ADD CONSTRAINT "ApprovalFlow_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketApproval" ADD CONSTRAINT "TicketApproval_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
