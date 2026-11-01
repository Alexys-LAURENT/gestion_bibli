"use server"
import prisma from "@/lib/db";

export async function getAllBooksLike(whereLike:string){
  try {

    const books = (await prisma.books.findMany(
      {
        select:{
          id_book:true,
          title:true,
          image_url:true,
        },
        where: {
          title: {
            contains: whereLike,
            mode: 'insensitive',
          }
        },
      }
    )).slice(0,20)
    
    return JSON.parse(JSON.stringify({
      success: true,
      data: books,
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}