// utils/getBooksOnDoing.ts
'use server';
 
import prisma from "@/lib/db";



export async function FunctionGetAllOnDoingBooks(id_user: number)  {
    try {
    const booksrequest = await prisma.loan.findMany({
        select: {
            books: {
                select: {
                    image_url: true,
                    id_book: true,
                    title: true,
                    id_author: true,
                        authors: {  // Utilisation de la relation 'authors' pour récupérer les infos de l'auteur
                            select: {
                                name_author: true  
                            }
                        }
                }
            }
        },
        where: {
            is_return: false,
            id_user: id_user,
        }
    });
    

    const limitedBooks = booksrequest.slice(0, 20);

    console.log("test",limitedBooks);

    return JSON.parse(JSON.stringify({ success: true, data: limitedBooks }));

    } catch (error) {
        if (error instanceof Error) {
    return JSON.parse(JSON.stringify({ error: true, message: error.message }));
    }
    }
}
