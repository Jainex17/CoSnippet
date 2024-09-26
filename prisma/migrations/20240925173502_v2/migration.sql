/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `snippet_likes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_sid_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_uid_fkey";

-- DropForeignKey
ALTER TABLE "snippet_likes" DROP CONSTRAINT "snippet_likes_sid_fkey";

-- DropForeignKey
ALTER TABLE "snippet_likes" DROP CONSTRAINT "snippet_likes_uid_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "files";

-- DropTable
DROP TABLE "post";

-- DropTable
DROP TABLE "snippet_likes";

-- CreateTable
CREATE TABLE "snippet" (
    "sid" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "totalFiles" INTEGER NOT NULL,
    "totalLikes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "snippet_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "file" (
    "fid" SERIAL NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "code" TEXT NOT NULL,
    "sid" INTEGER NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "snippet_like" (
    "lid" INTEGER NOT NULL,
    "sid" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,
    "hasLiked" BOOLEAN NOT NULL,
    "hasDisliked" BOOLEAN NOT NULL,

    CONSTRAINT "snippet_like_pkey" PRIMARY KEY ("sid","uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "file_filename_key" ON "file"("filename");

-- AddForeignKey
ALTER TABLE "snippet" ADD CONSTRAINT "snippet_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_sid_fkey" FOREIGN KEY ("sid") REFERENCES "snippet"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippet_like" ADD CONSTRAINT "snippet_like_sid_fkey" FOREIGN KEY ("sid") REFERENCES "snippet"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippet_like" ADD CONSTRAINT "snippet_like_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
