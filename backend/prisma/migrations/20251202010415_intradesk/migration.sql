/*
  Warnings:

  - You are about to drop the column `fileName` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `defaultSla` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `isInternal` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `dueAt` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `sla` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `slaBreached` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ApprovalFlow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ApprovalFlowStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketApproval` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `helpdeskId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Ticket` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApprovalFlow" DROP CONSTRAINT "ApprovalFlow_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ApprovalFlowStep" DROP CONSTRAINT "ApprovalFlowStep_approverId_fkey";

-- DropForeignKey
ALTER TABLE "ApprovalFlowStep" DROP CONSTRAINT "ApprovalFlowStep_flowId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TicketActivity" DROP CONSTRAINT "TicketActivity_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "TicketApproval" DROP CONSTRAINT "TicketApproval_approverId_fkey";

-- DropForeignKey
ALTER TABLE "TicketApproval" DROP CONSTRAINT "TicketApproval_stepId_fkey";

-- DropForeignKey
ALTER TABLE "TicketApproval" DROP CONSTRAINT "TicketApproval_ticketId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "fileName",
DROP COLUMN "filePath",
DROP COLUMN "mimeType",
DROP COLUMN "size",
DROP COLUMN "uploadedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "defaultSla",
DROP COLUMN "parentId",
ADD COLUMN     "helpdeskId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorId",
DROP COLUMN "isInternal",
DROP COLUMN "message",
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignedToId",
DROP COLUMN "createdById",
DROP COLUMN "dueAt",
DROP COLUMN "sla",
DROP COLUMN "slaBreached",
DROP COLUMN "title",
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'OPEN',
ALTER COLUMN "priority" SET DEFAULT 'P3',
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ApprovalFlow";

-- DropTable
DROP TABLE "ApprovalFlowStep";

-- DropTable
DROP TABLE "TicketActivity";

-- DropTable
DROP TABLE "TicketApproval";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Helpdesk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Helpdesk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "companyName" TEXT NOT NULL DEFAULT 'Mi Empresa',
    "timezone" TEXT NOT NULL DEFAULT 'America/Asuncion',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "primaryColor" TEXT NOT NULL DEFAULT '#303a4b',
    "logoUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_helpdeskId_fkey" FOREIGN KEY ("helpdeskId") REFERENCES "Helpdesk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
