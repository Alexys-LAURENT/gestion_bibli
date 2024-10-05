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