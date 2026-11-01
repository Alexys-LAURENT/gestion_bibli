import { Book } from "@/types/HomePage/entities";
import BookCard from "../BookCard";

export default function DisplayBooks({books}:{books:Book[]}) {
    return (
        <div className='flex max-h-[calc(100svh-160px)] scrollbar-custom overflow-y-auto flex-wrap gap-4 py-4 w-full'> 
            {books && books.length>0 && books.map((book) => (
               <BookCard book={book} key={book.id_book}/>
            ))}
        </div>
    );
}