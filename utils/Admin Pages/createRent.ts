"use server"
import prisma from "@/lib/db";

export async function createRent(idBook:number, idUser:number, loanDate:string){
  try {

    const newRent = await prisma.loan.create({
      data: {
        id_book: idBook,
        id_user: idUser,
        loan_date: new Date(loanDate),
        is_return: false,
      },
    })

    if(!newRent){
      return JSON.parse(JSON.stringify({
        error: true,
        message: 'Error creating the rent',
      }))
    }

    const updatedBook = await prisma.books.update({
      where: {
        id_book: idBook,
      },
      data: {
        is_loan: true,
      },
    })

    if(!updatedBook){
      return JSON.parse(JSON.stringify({
        error: true,
        message: 'Error updating book status',
      }))
    }
    
    return JSON.parse(JSON.stringify({
      success: true,
      data: newRent,
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}