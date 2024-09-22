-- CreateTable
CREATE TABLE "post" (
    "sid" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "totalFiles" INTEGER NOT NULL,
    "totalLikes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "files" (
    "fid" INTEGER NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "code" TEXT NOT NULL,
    "sid" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "snippet_likes" (
    "lid" INTEGER NOT NULL,
    "sid" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,
    "hasLiked" BOOLEAN NOT NULL,
    "hasDisliked" BOOLEAN NOT NULL,

    CONSTRAINT "snippet_likes_pkey" PRIMARY KEY ("sid","uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_fid_key" ON "files"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "files_filename_key" ON "files"("filename");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_sid_fkey" FOREIGN KEY ("sid") REFERENCES "post"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippet_likes" ADD CONSTRAINT "snippet_likes_sid_fkey" FOREIGN KEY ("sid") REFERENCES "post"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippet_likes" ADD CONSTRAINT "snippet_likes_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
