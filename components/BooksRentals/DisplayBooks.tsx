"use client";
import BookCard from "../BookCard";
import { Book } from "@/types/HomePage/entities";

export default function DisplayBooks({ books, emptyMessage }: {books:Book[], emptyMessage:string}) {
    return (
        <div className='flex flex-wrap gap-4 py-4 w-full'>
            {/* Vérifie si des livres sont présents */}
            {books && books.length > 0 ? (
                books.map((book) => (
                   <BookCard book={book as Book} key={book.id_book}/>
                ))
            ) : (
                // Affichage du message si aucun livre n'est emprunté
                <p className="text-center text-gray-500">{emptyMessage}</p>
            )}
        </div>
    );
}
