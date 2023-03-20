/*
  Warnings:

  - The `addressDetail` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressDetail",
ADD COLUMN     "addressDetail" VARCHAR(255)[];
