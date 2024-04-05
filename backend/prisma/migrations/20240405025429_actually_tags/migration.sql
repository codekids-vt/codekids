/*
  Warnings:

  - You are about to drop the column `gradeRange` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "gradeRange",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
