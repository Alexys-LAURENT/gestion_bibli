"use server"
import prisma from "@/lib/db";

export async function getAllAuthorsLike(whereLike:string){
  try {

    const authors = (await prisma.authors.findMany(
      {
        where: {
          name_author: {
            contains: whereLike,
            mode: 'insensitive',
          },
        },
      }
    )).slice(0,20)
    
    return JSON.parse(JSON.stringify({
      success: true,
      data: authors,
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}