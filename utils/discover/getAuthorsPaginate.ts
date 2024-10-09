'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getAuthorsPaginate( authorName: string) {
    
    try {

        // get authors
        const authors = await prisma.authors.findMany({
            take: 10,
            where: {
                name_author: {
                    contains: authorName,
                    mode: 'insensitive'
                }
            },
            select: {
                name_author: true,
                id_author: true,
            }
        });

        
        return JSON.parse(JSON.stringify({success: true, data: authors }))
    } catch (error) {
        console.log(error);
        
        return { error: true, message: "An error occured" };
    }
}
