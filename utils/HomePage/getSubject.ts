'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma


export async function getSubjectByListId(id: number[]) {
    try {
        const results = await prisma.subjects.findMany({
            where: {
                id_subject: {in: id},
            },
        });
        return JSON.parse(JSON.stringify({ success: true, data: results }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}

export async function getBookSubject(id: number) {
    try {
        const results = await prisma.books_subjects.findMany({
            where: {
                id_book: id,
            },
        });
        return JSON.parse(JSON.stringify(results));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}

export async function getSubjectById(id: number) {
    try {
        const results = await prisma.subjects.findUnique({
            where: {
                id_subject: id,
            },
        });
        return JSON.parse(JSON.stringify({ success: true, data: results }));
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}

export async function getSortedSubject() {
    let sortedBooks: {id_book: number, nb_loan: number}[] = [{id_book: 0, nb_loan: 0}];
    let sortedSubject: {id_subject: number, nb_loan: number}[] = [{id_subject: 0, nb_loan: 0}];
    let isFound: boolean = false;
    let index = 0;
    let temp;
    let temp_id: number;
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
        for (let i = 0; sortedBooks.length > i; i++) {
            temp  = await prisma.books_subjects.findMany({
                where: {
                    id_book: sortedBooks[i].id_book,
                },
            });
            for (let j = 0; temp.length > j; j++) {
                temp_id = temp[j].id_book;
                sortedSubject.forEach((element, index) => {
                    if (element.id_subject == temp_id) {
                        sortedSubject[index].nb_loan = (sortedSubject[index].nb_loan + (1 * sortedBooks[i].nb_loan));
                        isFound = true;
                    }
                });
                if (isFound == false) {
                    sortedSubject.push({id_subject:temp[j].id_subject, nb_loan: (1 * sortedBooks[i].nb_loan)})
                }
            }
            isFound = false;
        }
        sortedSubject.shift();
        sortedSubject.sort((a, b) => a.nb_loan - b.nb_loan);
        let listId: number[] = [0];
        for (let i = 0; i < sortedSubject.length; i++) {
            listId.push(sortedSubject[i].id_subject)
        }
        const result = getSubjectByListId(listId);
        return result;
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({ error: true, message: error }));
    }
}