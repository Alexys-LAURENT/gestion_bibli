"use server"
import prisma from "@/lib/db";

export async function getAllRentsCount(){
  try {
    const loans = (await prisma.loan.count())
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