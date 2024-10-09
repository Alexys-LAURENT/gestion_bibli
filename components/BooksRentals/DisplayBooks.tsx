"use client";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import placeholderImg from "@/public/placeholder.png";


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
                    <Link href={`/book/${book.id_book}`} key={`book-for-you-${book.id_book}`} className="flex flex-col gap-4 w-[180px] hover:bg-neutral-200 rounded-md p-2 transition-colors duration-200">
                        {book.image_url 
                            ? <Image src={book.image_url} alt={book.title} className="w-full h-[250px] object-cover rounded-md" width={180} height={250}/> 
                            : <Image src={placeholderImg.src} alt={book.title} className="w-full h-[250px] object-cover rounded-md" width={180} height={250}/> 
                        }
                        <div className="flex flex-1 flex-col justify-between">
                            <p className="text-black font-bold line-clamp-2" title={book.title}>{book.title}</p>
                             <p className="text-default-500 text-sm">{book.authors.name_author}</p>
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
