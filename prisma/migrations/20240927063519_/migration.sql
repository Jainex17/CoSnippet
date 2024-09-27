/*
  Warnings:

  - The primary key for the `snippet_like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hasDisliked` on the `snippet_like` table. All the data in the column will be lost.
  - You are about to drop the column `hasLiked` on the `snippet_like` table. All the data in the column will be lost.
  - Added the required column `reaction` to the `snippet_like` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "snippet" ALTER COLUMN "totalLikes" SET DEFAULT 0;

-- AlterTable
CREATE SEQUENCE snippet_like_lid_seq;
ALTER TABLE "snippet_like" DROP CONSTRAINT "snippet_like_pkey",
DROP COLUMN "hasDisliked",
DROP COLUMN "hasLiked",
ADD COLUMN     "reaction" "ReactionType" NOT NULL,
ALTER COLUMN "lid" SET DEFAULT nextval('snippet_like_lid_seq'),
ADD CONSTRAINT "snippet_like_pkey" PRIMARY KEY ("lid");
ALTER SEQUENCE snippet_like_lid_seq OWNED BY "snippet_like"."lid";

-- CreateIndex
CREATE INDEX "file_sid_idx" ON "file"("sid");

-- CreateIndex
CREATE INDEX "snippet_uid_idx" ON "snippet"("uid");

-- CreateIndex
CREATE INDEX "snippet_like_sid_uid_idx" ON "snippet_like"("sid", "uid");
