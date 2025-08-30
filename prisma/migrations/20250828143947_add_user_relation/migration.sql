-- 1. Créer la table User
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- 2. Créer un index unique sur le username
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- 3. Ajouter les colonnes userId à Course et Lesson
ALTER TABLE "Course" ADD COLUMN "userId" INTEGER;
ALTER TABLE "Lesson" ADD COLUMN "userId" INTEGER;

-- 4. Créer un utilisateur admin par défaut
INSERT INTO "public"."User" ("username", "passwordHash") VALUES ('admin', '<hash_du_mot_de_passe>');

-- 5. Mettre à jour les lignes existantes pour pointer vers l'admin
UPDATE "Course" SET "userId" = 1;
UPDATE "Lesson" SET "userId" = 1;

-- 6. Rendre les colonnes userId obligatoires
ALTER TABLE "Course" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "Lesson" ALTER COLUMN "userId" SET NOT NULL;

-- 7. Ajouter les clés étrangères
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
