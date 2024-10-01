'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getBookByListId(id: number[]) {
    try {
        const results = await prisma.books.findMany({
            where: {
                id_book: {in: id},
            },
        });
        return JSON.parse(JSON.stringify({ success: true, data: results }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}

export async function getSortedBooks() {
    let sortedBooks: {id_book: number, nb_loan: number}[] = [{id_book: 0, nb_loan: 0}];
    let isFound: boolean = false;
    try {
        const loan = (await prisma.loan.findMany()); // Récupération des livres
        for (let i = 0; i < loan.length; i++) {
            if (loan[i].is_return == true) {
                for (let j = 0; j < sortedBooks.length; j++) {
                    if (sortedBooks[j].id_book == loan[i].id_book) {
                        sortedBooks[j].nb_loan++;
                        isFound = true;
                    }
                }
                if (isFound != true) {
                    sortedBooks.push({id_book:loan[i].id_book, nb_loan: 1});
                    isFound = false;
                }
            }
        }
        sortedBooks.shift();
        sortedBooks.sort((a, b) => a.nb_loan - b.nb_loan);
        let listId: number[] = [0];
        for (let i = 0; i < sortedBooks.length; i++) {
            listId.push(sortedBooks[i].id_book)
        }
        const result = getBookByListId(listId);
        return result;
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}

export async function getAllBooks() {
    try {
        const books = (await prisma.books.findMany()).slice(0,50); // Récupération des livres
        return JSON.parse(JSON.stringify({ success: true, data: books }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}
