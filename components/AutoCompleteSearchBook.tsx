"use client"
import { getAllBooksPaginate } from '@/utils/Admin Pages/getAllBooks';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
const AutoCompleteSearchBook = () => {
  const [books, setBooks] = useState<{id_book:number, title:string, image_url:string}[]>([]);
  const [autoCompleteBooksValue, setAutoCompleteBooksValue] = useState<string>('');
  const router = useRouter()
  useEffect(() => {    
    const fetchBooks = async () => {
      const { data } = await getAllBooksPaginate(0, 20, `%${autoCompleteBooksValue}%`);
      setBooks(data);
    };
    fetchBooks();
  }, [autoCompleteBooksValue]);

  const handleSelectionChange = (value: string) => {
    if(!value) return;
    router.push(`/book/${value}`);
  };

  return (
       <Autocomplete 
       aria-label='Search for a book'
       size='sm'
       className='max-w-sm'
       items={books}
       value={autoCompleteBooksValue}
        startContent={
          <MagnifyingGlassIcon className='w-6 h-6 text-gray-400' />
        }
                  onValueChange={setAutoCompleteBooksValue}
                  onSelectionChange={(value)=>handleSelectionChange(value as string)}
                  placeholder='Search for a book...'
                >
                {(book) => (
                  <AutocompleteItem textValue={book.title} value={book.id_book} key={book.id_book}>
                    <Link href={`/book/${book.id_book}`} className='w-full flex gap-4 items-center'>
                      <div className='flex items-center gap-2'>
                        <Image priority={true} src={book.image_url} alt={`${book.title} - cover`} width={200} height={300} className="w-10 h-auto rounded-md" />
                      </div>  
                      <div className='flex flex-col gap-1'>
                        <div className='text-sm font-semibold'>{book.title}</div>
                      </div>

                    </Link>
                  </AutocompleteItem>
                )}
              </Autocomplete>
  );
};

export default AutoCompleteSearchBook;