// utils/getBooksOnDoing.ts
'use server';
 
import prisma from "@/lib/db";



export async function FunctionGetAllDoneBooks(id_user: number)  {
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
            is_return: true,
            id_user: id_user,
        }
    });

    
    type Book = {
        books: {
            image_url: string|null,
            id_book: number,
            title: string,
            id_author: number,
            authors: {
                name_author: string
            }
          }
    }

    const limitedBooks = booksrequest.slice(0, 20);
    const clearLimitedBooks = limitedBooks.map((book:Book) => {
        return {
          ...book.books
          }
      });
    return JSON.parse(JSON.stringify({ success: true, data: clearLimitedBooks }));

    } catch (error) {
        if (error instanceof Error) {
    return JSON.parse(JSON.stringify({ error: true, message: error.message }));
    }
    }
}
