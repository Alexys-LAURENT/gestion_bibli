'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma
import { auth } from "../auth";

export async function getBooksDiscoverForYouPaginate(offset: number, limit: number) {

    try {
        const user = await auth();

        let books;

        if (user) {
            const id_user = user.user.id_user;

            // get subjects from subjects table based on user's loaned books using pivot table books_subjects
            const subjects = await prisma.books_subjects.findMany({
                where: {
                    books: {
                        loan: {
                            some: {
                                id_user: Number(id_user)
                            }
                        }
                    }
                },
                select: {
                    subjects: {
                        select: {
                            label: true
                        }
                    }
                }
            });

            // get number of occurrences of each subject
            const subjectsCount = subjects.reduce((acc: { [key: string]: number }, curr) => {
                if (acc[curr.subjects.label]) {
                    acc[curr.subjects.label] += 1;
                } else {
                    acc[curr.subjects.label] = 1;
                }
                return acc;
            }, {});

            // Sort subjects by their count in descending order
            const sortedSubjects = Object.keys(subjectsCount).sort((a, b) => subjectsCount[b] - subjectsCount[a]);

            if (sortedSubjects.length > 0) {
                books = await prisma.books.findMany({
                    take: limit,
                    skip: offset,
                    where: {
                        NOT: {
                            loan: {
                                some: {
                                    id_user: Number(id_user)
                                }
                            }
                        },
                        books_subjects: {
                            some: {
                                subjects: {
                                    label: {
                                        in: sortedSubjects
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        books_subjects: {
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
                        authors: {
                            select: {
                                name_author: true,
                            }
                        }
                    }
                });
            } else {
                books = await prisma.books.findMany({
                    take: limit,
                    skip: offset,
                    where: {
                        NOT: {
                            loan: {
                                some: {
                                    id_user: Number(id_user)
                                }
                            }
                        }
                    },
                    select: {
                        first_sentence: true,
                        image_url: true,
                        is_loan: true,
                        title: true,
                        year_publication: true,
                        id_book: true,
                        authors: {
                            select: {
                                name_author: true,
                            }
                        }
                    }
                });
            }
        } else {
            // If no user is logged in, return random books
            books = await prisma.books.findMany({
                take: limit,
                skip: offset,
                orderBy: {
                    id_book: 'asc', // You could also use 'rand()' if supported by your database for random sorting
                },
                select: {
                    first_sentence: true,
                    image_url: true,
                    is_loan: true,
                    title: true,
                    year_publication: true,
                    id_book: true,
                    authors: {
                        select: {
                            name_author: true,
                        }
                    }
                }
            });
        }

        const lastPage = books.length < limit;

        return JSON.parse(JSON.stringify({ success: true, data: books, lastPage: lastPage }));
    } catch (error) {
        console.log(error);

        return { error: true, message: "An error occurred" };
    }
}
