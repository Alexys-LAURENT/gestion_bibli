// File: /components/BooksRentals/GetBooksDone.tsx
"use client";
import Image from "next/image";

// Interface mise à jour pour inclure les données de books en props
export interface BooksArgD {
  id_user: number; // Ou string, selon le type utilisé dans ta base de données
  booksDone: any; // Type des données de livres récupérées
}

export default function GetBooksDone({ booksDone }: BooksArgD) {
  return (
    <div className='flex flex-wrap gap-4 py-4 w-full'>
      {/* Vérifie si des livres sont présents */}
      {booksDone.data && booksDone.data.length > 0 ? (
        booksDone.data.map((book: any) => (
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
        ))
      ) : (
        // Affichage du message si aucun livre n'est terminé
        <p className="text-center text-gray-500">No books currently Done</p>
      )}
    </div>
  );
}
