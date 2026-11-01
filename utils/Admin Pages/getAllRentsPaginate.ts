"use server"
import prisma from "@/lib/db";

export async function getAllRentsPaginate(start:number, end:number, whereLike?:string){
  try {

    let query
    let loans : unknown;
    if(whereLike){
      query = prisma.loan.findMany({
        select:{
          id_book:true,
          id_user:true,
          loan_date:true,
          is_return:true,
         books:{
          select:{
            image_url:true,
            title:true
          }
         },
         users:{
          select:{
            mail:true,
            firstname:true,
            lastname:true,
          }
         }
        },
        where: {
          books: {
            title:{
              contains: whereLike,
              mode: 'insensitive',
            }
          },
        },
        orderBy: {
          loan_date: 'desc',
        },
      });
      loans = (await query).slice(start, end);
    } else {
      query = prisma.loan.findMany({
        select:{
          id_book:true,
          id_user:true,
          loan_date:true,
          is_return:true,
         books:{
          select:{
            image_url:true,
            title:true
          }
         },
         users:{
          select:{
            mail:true,
            firstname:true,
            lastname:true,
          }
         }
        },
        orderBy: {
          loan_date: 'desc',
        },
      })
      loans =(await query).slice(start, end);
    }
    
    return JSON.parse(JSON.stringify({
      success: true,
      data: loans,
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}