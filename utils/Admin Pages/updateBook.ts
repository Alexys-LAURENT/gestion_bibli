"use server"
import prisma from "@/lib/db";
import { BookType } from "@/types/AdminPages/entities";

type Data = BookType & { name_author: string };

export async function updateBook(data:Data){
  try {
    console.log(data.year_publication);
    
    let new_author_id : number | null = null;
    const author = await prisma.authors.findFirst({
      where: {
        name_author: data.name_author,
      },
    });

    if(!author){
      const new_author = await prisma.authors.create({
        data: {
          name_author: data.name_author,
        },
      });
      new_author_id = new_author.id_author;
    }

    const book = await prisma.books.update({
      where: {
        id_book: data.id_book,
      },
      data: {
        title: data.title,
        year_publication: data.year_publication,
        first_sentence: data.first_sentence,
        image_url: data.image_url || undefined,
        id_author: new_author_id ? new_author_id : author!.id_author,
      },
    });

    return JSON.parse(JSON.stringify({
      success: true,
      data: book,
    }))

  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}