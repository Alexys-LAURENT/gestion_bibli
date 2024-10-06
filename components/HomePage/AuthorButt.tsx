"use client"
import { useEffect, useState } from 'react';
import { getAuthorById } from '@/utils/HomePage/getAuthorById';
import { Button } from '@nextui-org/button';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AuthorButt({id}:{id:number}) {
  const pathName = usePathname();
  const [author, setAuthor] = useState<any>([])

    useEffect(() => {
        async function getData() {
        const res = await getAuthorById(id);
        setAuthor(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])
    return author.data ? (
        <Button
          key={`${author.data.name_author}-`} 
          href='' className={`w-full justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 ${pathName === '' ? 'bg-gest_cta text-white' : ''} `}>
            <UserCircleIcon className='w-6 h-6' />
            <span className='font-semibold ml-1'>{author.data.name_author}</span>
          </Button>
    ) : (
      <p>Chargement...</p>
    )
}