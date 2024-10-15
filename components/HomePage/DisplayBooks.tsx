import Image from "next/image";
import { Book } from "@/types/HomePage/entities";
import Link from "next/link";
import placeholderImg from "@/public/placeholder.png";

export default function DisplayBooks({books}:{books:Book[]}) {
    return (
        <div className='flex max-h-[calc(100svh-160px)] scrollbar-custom overflow-y-auto flex-wrap gap-4 py-4 w-full'> 
            {books && books.length>0 && books.map((book) => (
                <Link href={`/book/${book.id_book}`} key={`book-for-you-${book.id_book}`} className="flex flex-col gap-4 w-[180px] hover:bg-neutral-100 rounded-md p-2 transition-colors duration-200">
                    {book.image_url 
                        ? <Image priority src={book.image_url} alt={book.title} className="w-full h-[250px] object-cover rounded-md" width={180} height={250}/> 
                        : <Image priority src={placeholderImg.src} alt={book.title} className="w-full h-[250px] object-cover rounded-md" width={180} height={250}/> 
                    }
                    <div className="flex flex-1 flex-col justify-between">
                        <p className="text-black font-bold line-clamp-2" title={book.title}>{book.title}</p>
                        <p className="text-default-500 text-sm">{book.authors.name_author}</p>
                    </div>
            </Link>
            ))}
        </div>
    );
}