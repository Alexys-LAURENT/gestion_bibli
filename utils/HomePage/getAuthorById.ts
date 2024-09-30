'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getAuthorById(id: number) {
    try {
        const results = await prisma.authors.findUnique({
            where: {
                id_author: id,
            },
        });
        return JSON.parse(JSON.stringify({ success: true, data: results }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}