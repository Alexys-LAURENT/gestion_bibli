/*
  Warnings:

  - The primary key for the `loan` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "loan" DROP CONSTRAINT "loan_pkey",
ALTER COLUMN "loan_date" SET DATA TYPE TIMESTAMP,
ADD CONSTRAINT "loan_pkey" PRIMARY KEY ("id_user", "id_book", "loan_date");
