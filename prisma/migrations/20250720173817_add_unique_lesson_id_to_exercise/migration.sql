/*
  Warnings:

  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `solutionCode` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `starterCode` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `validateCode` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
DROP COLUMN "description",
DROP COLUMN "solutionCode",
DROP COLUMN "starterCode",
ADD COLUMN     "prompt" TEXT NOT NULL DEFAULT 'Prompt temporaire',
ADD COLUMN     "solution" TEXT NOT NULL DEFAULT 'Solution temporaire',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Titre temporaire',
ADD COLUMN     "validateCode" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exercise_id_seq";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "validateCode";
