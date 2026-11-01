"use server"

import prisma from "@/lib/db";
import {  BookTypeWithAuthor } from "@/types/AdminPages/entities";
type Data = BookTypeWithAuthor & { name_author: string };

export async function addNewBook(data:Data){
  try {
    let new_author_id : number | null = null;
    
    const author = await prisma.authors.findFirst({
      where: {
        name_author: data.name_author,
      },
    })

    if(!author?.id_author){
      const new_author = await prisma.authors.create({
        data: {
          name_author: data.name_author,
        },
      });
      new_author_id = new_author.id_author;
    }
    const idToUse = new_author_id !== null ? new_author_id : author!.id_author;
    
    const book = await prisma.books.create({
      data: {
        title: data.title,
        year_publication: data.year_publication,
        first_sentence: data.first_sentence,
        image_url: data.image_url,
        id_author: idToUse,
        is_loan:false,
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