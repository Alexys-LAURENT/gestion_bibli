/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subjects_label_key" ON "subjects"("label");
