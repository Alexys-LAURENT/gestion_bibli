-- DropForeignKey
ALTER TABLE "books_subjects" DROP CONSTRAINT "books_subjects_id_book_fkey";

-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_id_book_fkey";

-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_id_user_fkey";

-- AddForeignKey
ALTER TABLE "books_subjects" ADD CONSTRAINT "books_subjects_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "books"("id_book") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "books"("id_book") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
