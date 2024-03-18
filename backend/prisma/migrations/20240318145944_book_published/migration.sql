-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "readyForPublish" BOOLEAN NOT NULL DEFAULT false;
