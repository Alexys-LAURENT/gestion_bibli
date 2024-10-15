import Link from 'next/link';
import Image from 'next/image';
import placeholderImg from '@/public/placeholder.png';
import { Book } from '@/types/HomePage/entities';
const BookCard = ({book}:{book:{
  authors: {
      name_author: string;
  };
  first_sentence: string;
  id_book: number;
  image_url: string;
  is_loan: boolean;
  title: string;
  year_publication: number;
} | Book}) => {
  return (
    <Link href={`/book/${book.id_book}`} className="flex flex-col gap-4 w-full xs:w-[47%] md:w-[180px] hover:bg-neutral-100 rounded-md p-2 transition-colors duration-200">
    {book.image_url 
        ? <Image loading="eager" src={book.image_url} alt={book.title} className="w-full h-[250px] bg-slate-100 object-contain md:object-cover rounded-md" width={180} height={250}/> 
        : <Image loading="eager" src={placeholderImg.src} alt={book.title} className="w-full h-[250px] bg-slate-100 object-contain md:object-cover rounded-md" width={180} height={250}/> 
    }
    <div className="flex flex-1 flex-col justify-between">
        <p className="text-black font-bold line-clamp-2" title={book.title}>{book.title}</p>
        <p className="text-default-500 text-sm">{book.authors.name_author}</p>
    </div>
</Link>
  );
};

export default BookCard;