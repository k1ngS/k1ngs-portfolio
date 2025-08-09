-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."ProjectCategory" AS ENUM ('WEB', 'MOBILE', 'API', 'DESKTOP', 'AI', 'GAME', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."TechnologyCategory" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'MOBILE', 'AI', 'DESIGN', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."SkillCategory" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'MOBILE', 'AI', 'DESIGN', 'SOFT_SKILLS', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('TEXT', 'MARKDOWN', 'HTML', 'JSON');

-- CreateEnum
CREATE TYPE "public"."ContactStatus" AS ENUM ('UNREAD', 'READ', 'REPLIED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."user" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "_id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "_id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."project" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "category" "public"."ProjectCategory" NOT NULL,
    "status" "public"."ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "githubUrl" TEXT,
    "demoUrl" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."project_translation" (
    "_id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "project_translation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."technology" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "category" "public"."TechnologyCategory",
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "technology_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."project_technology" (
    "_id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "project_technology_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."tag" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."project_tag" (
    "_id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "project_tag_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."skill" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "category" "public"."SkillCategory" NOT NULL,
    "description" TEXT,
    "yearsOfExp" INTEGER NOT NULL DEFAULT 0,
    "certified" BOOLEAN NOT NULL DEFAULT false,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "technologyId" TEXT,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."skill_translation" (
    "_id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "skill_translation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."content" (
    "_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "public"."ContentType" NOT NULL DEFAULT 'TEXT',
    "category" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."content_translation" (
    "_id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "content_translation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."contact" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "public"."ContactStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "project_translation_projectId_language_key" ON "public"."project_translation"("projectId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "technology_name_key" ON "public"."technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_technology_projectId_technologyId_key" ON "public"."project_technology"("projectId", "technologyId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "public"."tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_tag_projectId_tagId_key" ON "public"."project_tag"("projectId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "skill_translation_skillId_language_key" ON "public"."skill_translation"("skillId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "content_key_key" ON "public"."content"("key");

-- CreateIndex
CREATE UNIQUE INDEX "content_translation_contentId_language_key" ON "public"."content_translation"("contentId", "language");

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_translation" ADD CONSTRAINT "project_translation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_technology" ADD CONSTRAINT "project_technology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_technology" ADD CONSTRAINT "project_technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."technology"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_tag" ADD CONSTRAINT "project_tag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_tag" ADD CONSTRAINT "project_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill" ADD CONSTRAINT "skill_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."technology"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_translation" ADD CONSTRAINT "skill_translation_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."skill"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."content_translation" ADD CONSTRAINT "content_translation_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."content"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
