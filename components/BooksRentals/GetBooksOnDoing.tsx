"use client";
import { Image } from "@nextui-org/image";

// Interface mise à jour pour inclure les données de books en props
export interface BooksArg {
    id_user: number; //  Le Type des données de livres récupérées
    books: any; // Type des données de livres récupérées
}

export default function GetBooksOnDoing({ books }: BooksArg) {
    console.log(books); // Vérifiez la structure ici

    return (
        <div className='flex flex-wrap gap-4 py-4 w-full'>
            {books.data && books.data.map((book: any) => (
                <div key={book.books.id_book} className="flex flex-col items-center w-[120px] h-[250px]">
                    <div className="w-[120px] h-[180px] relative">
                        <Image
                            alt={book.books.title}
                            className="object-cover rounded"
                            src={book.books.image_url || '/no.jpg'}
                            height={180}
                            width={120}
                        />
                    </div>
                    <div className='flex flex-col items-center mt-2 text-center'>
                        <p className="font-bold text-black text-sm">{book.books.title}</p>
                        <small className="text-default-500 text-gray-600 text-xs">
                            {book.books.authors.name_author || 'Unknown Author'}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
}
