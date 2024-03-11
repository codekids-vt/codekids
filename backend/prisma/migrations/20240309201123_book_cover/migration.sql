/*
  Warnings:

  - Made the column `bookCover` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverImage" TEXT,
ALTER COLUMN "bookCover" SET NOT NULL;
