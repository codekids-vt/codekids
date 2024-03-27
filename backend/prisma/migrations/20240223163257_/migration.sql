/*
  Warnings:

  - You are about to drop the column `number` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Page` table. All the data in the column will be lost.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradeRange` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookCategory" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "number",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "blurb" TEXT,
ADD COLUMN     "bookCover" TEXT,
ADD COLUMN     "category" "BookCategory" NOT NULL,
ADD COLUMN     "gradeRange" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "number",
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "props" JSONB;
