/*
  Warnings:

  - You are about to drop the column `domain` on the `blocked_websites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."blocked_websites" DROP COLUMN "domain";
