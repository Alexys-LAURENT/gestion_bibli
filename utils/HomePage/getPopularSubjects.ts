"use server"
import prisma from "@/lib/db";

export async function getPopularSubjects(limit:number){
  try {
    const popularSubjects = await prisma.subjects.findMany({
      select: {
        id_subject: true,
        label: true,
        _count: {
          select: {
            books_subjects: {
              where: {
                books: {
                  loan: {
                    some: {}, // S'assurer que le livre a été emprunté
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        books_subjects: {
          _count: 'desc', // Trier par nombre de livres empruntés dans chaque sujet
        },
      },
      take: limit,
    });
    return JSON.parse(JSON.stringify({ success: true, data: popularSubjects }));
} catch (error) {
    console.log(error);
    
    return JSON.parse(JSON.stringify({ error: true, message: error }));
}
}