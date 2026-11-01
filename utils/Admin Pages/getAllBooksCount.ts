"use server"
import prisma from "@/lib/db";

export async function getAllBooksCount(){
  try {
    const books = (await prisma.books.count())
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