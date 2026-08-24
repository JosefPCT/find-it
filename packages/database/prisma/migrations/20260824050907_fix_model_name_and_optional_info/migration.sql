/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_image_id_fkey";

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "original_width" INTEGER NOT NULL,
    "original_height" INTEGER NOT NULL,
    "additional_info" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_public_id_key" ON "images"("public_id");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
