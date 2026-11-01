'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getAllBooks(limit:number){
    try {
        const books = (await prisma.books.findMany({select:{image_url:true,id_book:true, title:true, authors:{
            select:{
                name_author:true
            }
        }},take:limit}));
        return JSON.parse(JSON.stringify({ success: true, data: books }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}
