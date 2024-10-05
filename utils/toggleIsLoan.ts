"use server"
import prisma from "@/lib/db";

export async function toggleIsLoan(idBook:number, idUser:number){
  try {

    const currentLoan = await prisma.loan.findFirst({
      where: {
        id_book: idBook,
        id_user: idUser,
      },
      orderBy: {
        loan_date: 'desc',
      },
    })

    if(!currentLoan){
      return JSON.parse(JSON.stringify({
        error: true,
        message: 'No loan found',
      }))
    }

      const updatedLoan = await prisma.loan.update({
        where: {
          id_book: idBook,
          id_user: idUser,
          loan_date: currentLoan.loan_date,
          id_user_id_book_loan_date : {
            id_user: currentLoan.id_user,
            id_book: currentLoan.id_book,
            loan_date: currentLoan.loan_date,
          },
        },
        data: {
          is_return: !currentLoan.is_return,
        },
      })

      if(!updatedLoan){
        return JSON.parse(JSON.stringify({
          error: true,
          message: 'No loan found',
        }))
      }


        const updatedBook = await prisma.books.update({
          where: {
            id_book: idBook,
          },
          data: {
            is_loan: !updatedLoan.is_return,
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
      data: updatedLoan,
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}