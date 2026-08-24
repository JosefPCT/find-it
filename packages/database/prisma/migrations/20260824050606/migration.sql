/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Picture";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "original_width" INTEGER NOT NULL,
    "original_height" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "image_id" INTEGER NOT NULL,
    "public_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_public_id_key" ON "posts"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_public_id_key" ON "tags"("public_id");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
