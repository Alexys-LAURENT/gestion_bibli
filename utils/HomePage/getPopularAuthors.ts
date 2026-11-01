"use server"
import prisma from "@/lib/db";

export async function getPopularAuthors(limit:number){
  try {
    const popularAuthors = await prisma.authors.findMany({
      select: {
        id_author: true,
        name_author: true,
        _count: {
          select: {
            books: {
              where: {
                loan: {
                  some: {}, // S'assurer que le livre a au moins un emprunt
                },
              },
            },
          },
        },
      },
      orderBy: {
        books: {
          _count: 'desc', // Trier par nombre de livres empruntés décroissant
        },
      },
      take: limit, // Limiter à 10 auteurs les plus populaires
    });
    return JSON.parse(JSON.stringify({ success: true, data: popularAuthors }));
} catch (error) {
    console.log(error);
    
    return JSON.parse(JSON.stringify({ error: true, message: error }));
}
}