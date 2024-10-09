"use server"
import prisma from "@/lib/db";

export async function getBookById(id_book:number){
  try {

    const book = await prisma.books.findUnique({
      select:{
        id_book:true,
        title:true,
        first_sentence:true,
        year_publication:true,
        image_url:true,
        is_loan:true,
        books_subjects:{
          select:{
            subjects:{
              select:{
                label:true,
              }
            }
          }
        },
        authors : {
          select : {
            name_author:true,
          id_author:true,
          }
        },
        loan:{
          select:{
            id_user:true,
            loan_date:true,
          },
          orderBy:{
            loan_date:'desc',
          },
          take:1,
        }
      },
      where: {
        id_book: id_book,
      },
    })
    
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