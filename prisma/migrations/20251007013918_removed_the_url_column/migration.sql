/*
  Warnings:

  - You are about to drop the column `url` on the `predefined_websites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[domain]` on the table `predefined_websites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."predefined_websites_url_key";

-- AlterTable
ALTER TABLE "public"."predefined_websites" DROP COLUMN "url";

-- CreateIndex
CREATE UNIQUE INDEX "predefined_websites_domain_key" ON "public"."predefined_websites"("domain");
