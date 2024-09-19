'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getSortedBooks() {
    try {
        const books = (await prisma.books.findMany()).slice(0,50); // Récupération des livres
        return JSON.parse(JSON.stringify({ success: true, data: books }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}
