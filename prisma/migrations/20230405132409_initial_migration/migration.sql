/*
  Warnings:

  - The primary key for the `Announcements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_by` on the `Announcements` table. All the data in the column will be lost.
  - You are about to drop the column `departmentsDepartment_id` on the `Announcements` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `departmentsDepartment_id` on the `Projects` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nus_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `projects` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `User` table. All the data in the column will be lost.
  - The `total_events` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Announcements` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `updated_date` on the `Announcements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uploaded_date` on the `Announcements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_lead` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `created_date` on the `Projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('WARNING', 'ERROR');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_departmentsDepartment_id_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_departmentsDepartment_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_pkey",
DROP COLUMN "created_by",
DROP COLUMN "departmentsDepartment_id",
ADD COLUMN     "department_id" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "announcement_id" SET DATA TYPE TEXT,
ALTER COLUMN "image" DROP NOT NULL,
DROP COLUMN "updated_date",
ADD COLUMN     "updated_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "uploaded_date",
ADD COLUMN     "uploaded_date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Announcements_pkey" PRIMARY KEY ("announcement_id");

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "roles",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "department",
DROP COLUMN "departmentsDepartment_id",
ADD COLUMN     "departments" TEXT,
ADD COLUMN     "difficulty" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "team_lead" TEXT NOT NULL,
DROP COLUMN "created_date",
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "emailVerified",
DROP COLUMN "nus_email",
DROP COLUMN "projects",
DROP COLUMN "student_id",
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "diet" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN DEFAULT false,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "race" TEXT,
ADD COLUMN     "shirt" TEXT,
ALTER COLUMN "attendance" DROP NOT NULL,
ALTER COLUMN "attendance" SET DEFAULT 0,
ALTER COLUMN "batch" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "discord" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "faculty" DROP NOT NULL,
ALTER COLUMN "hobbies" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "personal_email" DROP NOT NULL,
ALTER COLUMN "roles" DROP NOT NULL,
ALTER COLUMN "telegram" DROP NOT NULL,
DROP COLUMN "total_events",
ADD COLUMN     "total_events" INTEGER DEFAULT 0,
ALTER COLUMN "wallet" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Event" (
    "endDate" DATE NOT NULL,
    "hasStarted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "qr_code" TEXT,
    "startDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "LogType" NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_attendanceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsToUser_AB_unique" ON "_ProjectsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsToUser_B_index" ON "_ProjectsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_attendanceToUser_AB_unique" ON "_attendanceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_attendanceToUser_B_index" ON "_attendanceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_departments_fkey" FOREIGN KEY ("departments") REFERENCES "Departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUser" ADD CONSTRAINT "_ProjectsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUser" ADD CONSTRAINT "_ProjectsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attendanceToUser" ADD CONSTRAINT "_attendanceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attendanceToUser" ADD CONSTRAINT "_attendanceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
