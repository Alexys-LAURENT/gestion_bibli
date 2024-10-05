'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getBooksDiscoverMostLoanedPaginate( offset: number, limit: number) {
    
    try {

        // get most loaned books
        const books = await prisma.books.findMany({
            take: limit,
            skip: offset,
            distinct: ['id_book'],
            orderBy: {
                loan: {
                    _count: 'desc'
                }
            },
            select: {
                first_sentence: true,
                image_url: true,
                is_loan: true,
                title: true,
                year_publication: true,
                id_book: true,
                authors : {
                    select : {
                        name_author: true,
                        id_author: true,
                    }
                }
            }
        });

        
        return JSON.parse(JSON.stringify({success: true, data: books }))
    } catch (error) {
        console.log(error);
        
        return { error: true, message: "An error occured" };
    }
}
