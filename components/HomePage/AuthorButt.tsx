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
    const link = {
      name: author.data.name_author,
      href: '',
      icon: <UserCircleIcon className='w-6 h-6' />,
    }
    return (
        <Button
          as={Link}
          key={`${link.name}-${link.href}
          `} href={link.href} className={`w-full justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 ${pathName === link.href ? 'bg-gest_cta text-white' : ''} `}>
            {link.icon}
            <span className='font-semibold ml-1'>{link.name}</span>
          </Button>
    )
}