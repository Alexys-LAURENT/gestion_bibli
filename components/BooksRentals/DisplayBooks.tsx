"use client";
import { Image } from "@nextui-org/image";
import Link from "next/link";


type Book = {
    authors: { name_author: string };
    id_author: number;
    id_book: number;
    image_url: string | null;
    title: string;
  }

export default function DisplayBooks({ books, emptyMessage }: {books:Book[], emptyMessage:string}) {
    return (
        <div className='flex flex-wrap gap-4 py-4 w-full'>
            {/* Vérifie si des livres sont présents */}
            {books && books.length > 0 ? (
                books.map((book) => (
                    <Link href={`/book/${book.id_book}`} key={book.id_book} className="flex flex-col items-center w-[120px] h-[250px]">
                        <div className="w-[120px] h-[180px] relative">
                            {
                                book.image_url ? (<Image
                                    alt={book.title}
                                    className="object-cover rounded"
                                    src={book.image_url}
                                    height={180}
                                    width={120}
                                /> ) : (
                                    <div className="w-[120px] h-[180px] bg-gray-300 rounded-md flex items-center justify-center">
                                        <span className="text-tiny">No cover available</span>
                                    </div>
                                )
                            }
                            
                        </div>
                        <div className='flex flex-col items-center mt-2 text-center'>
                            <p className="font-bold text-black text-sm">{book.title}</p>
                            <small className=" text-gray-600 text-xs">
                                {book.authors.name_author || 'Unknown Author'}
                            </small>
                        </div>
                    </Link>
                ))
            ) : (
                // Affichage du message si aucun livre n'est emprunté
                <p className="text-center text-gray-500">{emptyMessage}</p>
            )}
        </div>
    );
}
