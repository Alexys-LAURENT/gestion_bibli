-- CreateTable
CREATE TABLE "authors" (
    "id_author" SERIAL NOT NULL,
    "name_author" VARCHAR(255) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id_author")
);

-- CreateTable
CREATE TABLE "books" (
    "id_book" SERIAL NOT NULL,
    "id_author" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "year_publication" INTEGER NOT NULL,
    "first_sentence" TEXT,
    "image_url" VARCHAR(255),
    "is_loan" BOOLEAN DEFAULT false,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id_book")
);

-- CreateTable
CREATE TABLE "books_subjects" (
    "id_book" INTEGER NOT NULL,
    "id_subject" INTEGER NOT NULL,

    CONSTRAINT "books_subjects_pkey" PRIMARY KEY ("id_book","id_subject")
);

-- CreateTable
CREATE TABLE "loan" (
    "id_user" INTEGER NOT NULL,
    "id_book" INTEGER NOT NULL,
    "loan_date" DATE NOT NULL,
    "is_return" BOOLEAN DEFAULT false,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id_user","id_book","loan_date")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id_subject" SERIAL NOT NULL,
    "label" VARCHAR(100) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id_subject")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "birth_date" DATE NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "zip" VARCHAR(20) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_author_key" ON "authors"("name_author");

-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "users"("mail");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "authors"("id_author") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_subjects" ADD CONSTRAINT "books_subjects_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "books"("id_book") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_subjects" ADD CONSTRAINT "books_subjects_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "subjects"("id_subject") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "books"("id_book") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
