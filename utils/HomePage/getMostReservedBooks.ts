'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getMostReservedBooks(limit:number){
    const topBooks = await prisma.books.findMany({
        select: {
          id_book: true,
          title: true,
          image_url: true,
          authors:{
            select:{
                name_author:true
            }
        },
          _count: {
            select: {
              loan: true, // Compter le nombre d'emprunts pour chaque livre
            },
          },
        },
        orderBy: {
          loan: {
            _count: 'desc', // Trier les livres par nombre d'emprunts décroissant
          },
        },
        take: limit,
      });
    return JSON.parse(JSON.stringify({ success: true, data: topBooks }));
} 