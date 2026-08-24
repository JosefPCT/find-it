/*
  Warnings:

  - You are about to drop the column `public_id` on the `images` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "images_public_id_key";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "public_id";
