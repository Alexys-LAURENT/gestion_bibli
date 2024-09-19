"use server"
import prisma from "@/lib/db";

export async function getAllBooksPaginate(start:number, end:number, whereLike?:string){
  try {

    let query
    let books : unknown;
    if(whereLike){
      query = prisma.books.findMany({
        select:{
          first_sentence:true,
          image_url:true,
          is_loan:true,
          title:true,
          year_publication:true,
          id_book:true,
          authors : {
            select : {
              name_author:true,
          id_author:true,
            }
          }
        },
        where: {
          title: {
            contains: whereLike,
            mode: 'insensitive',
          },
        },
      });
      books = await query;
    } else {
      query =  prisma.books.findMany({
        select:{
          first_sentence:true,
          image_url:true,
          is_loan:true,
          title:true,
          year_publication:true,
          id_book:true,
          authors : {
            select : {
              name_author:true,
          id_author:true,
            }
          }
        }
      })
      books =(await query).slice(start, end);
    }
    
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