// File: /types/BooksRentals/BooksArgs.ts

export interface BooksArgOD { 
  id_user: number;
  booksOnDoing: any; // Remplacez "any" par le type exact si vous le connaissez
}

export interface BooksArgD { 
  id_user: number;
  booksDone: any; // Remplacez "any" par le type exact si vous le connaissez
}

// Type combiné pour inclure les propriétés des deux interfaces
export type CombinedBooksArgs = BooksArgOD & BooksArgD;
