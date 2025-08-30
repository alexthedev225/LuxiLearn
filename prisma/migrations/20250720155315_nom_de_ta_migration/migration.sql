-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "question" DROP NOT NULL,
ALTER COLUMN "correctAnswer" DROP NOT NULL;
