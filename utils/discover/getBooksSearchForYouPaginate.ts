'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getBooksSearchForYouPaginate( offset: number, limit: number, bookName: string, authors: { name_author:string }[], subjects:{ label:string }[], publishYear: number | null) {
    
    try {
        // get search books
        const books = await prisma.books.findMany({
            take: limit,
            skip: offset,
            where: {
                title: {
                    contains: bookName,
                    mode: 'insensitive'
                },
                authors: authors.length > 0 ? {
                    name_author: {
                    in: authors.map((author) => author.name_author),
                    mode: 'insensitive'
                    }
                } : undefined,
                books_subjects: subjects.length > 0 ? {
                    some: {
                    subjects: {
                        label: {
                        in: subjects.map((subject) => subject.label),
                        mode: 'insensitive'
                        }
                    }
                    }
                } : undefined,
                year_publication: publishYear ? {
                    equals: Number(publishYear)
                } : undefined
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

        const lastPage = books.length < limit;
        
        return JSON.parse(JSON.stringify({success: true, data: books, lastPage: lastPage }))
    } catch (error) {
        console.log(error);
        
        return { error: true, message: "An error occured" };
    }
}
