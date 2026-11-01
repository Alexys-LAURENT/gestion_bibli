"use server"

import prisma from "@/lib/db";

export const deleteBook = async (id:number) => {
  try {
    
    await prisma.books.delete({
        where: {
          id_book: id,
        },
      });


    return JSON.parse(JSON.stringify({
      success: true,
      message: "Book deleted",
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}