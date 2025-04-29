-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BookCategory" ADD VALUE 'ARTIFICIAL_INTELLIGENCE';
ALTER TYPE "BookCategory" ADD VALUE 'CYBER_SECURITY';
ALTER TYPE "BookCategory" ADD VALUE 'CODING';
ALTER TYPE "BookCategory" ADD VALUE 'MISCELLANEOUS';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "categories" "BookCategory"[] DEFAULT ARRAY[]::"BookCategory"[],
ALTER COLUMN "category" DROP NOT NULL;
