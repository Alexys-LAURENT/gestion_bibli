"use server"
import prisma from "@/lib/db";

export async function getAllusersLike(whereLike:string){
  try {
    
    const users = (await prisma.users.findMany(
      {
        select:{
id_user:true,
firstname:true,
lastname:true,
mail:true,
        },
        where: {
          OR: [
            {
              firstname: {
                contains: whereLike,
                mode: 'insensitive',
              },
            },
            {
              lastname: {
                contains: whereLike,
                mode: 'insensitive',
              },
            },
            {
              mail: {
                contains: whereLike,
                mode: 'insensitive',
              }
            },
          ],
          is_admin: false,
        },
      }
    )).slice(0,20)
    
    return JSON.parse(JSON.stringify({
      success: true,
      data: users,
    }))
  } catch (error) {
    console.error(error);
    return JSON.parse(JSON.stringify({
      error: true,
      message: error,
    }))
  }
}