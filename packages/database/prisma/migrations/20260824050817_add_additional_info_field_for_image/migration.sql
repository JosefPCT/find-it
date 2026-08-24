/*
  Warnings:

  - Added the required column `additional_info` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "additional_info" TEXT NOT NULL;
