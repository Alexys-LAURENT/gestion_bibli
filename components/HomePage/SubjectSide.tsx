"use client"
import { useEffect, useState } from 'react';
import { getSortedSubject } from '@/utils/HomePage/getSubject';
import { Button } from '@nextui-org/button';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function SubjectSide() {
    const pathName = usePathname();
    const [subject, setSubject] = useState<any>([])

    useEffect(() => {
        async function getData() {
        const res = await getSortedSubject();
        setSubject(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])
    console.log(subject.data)
    return (
        <div>
            <p className="text-xs ml-2 mr-2 font-bold text-black">Popular subjects</p>
            {subject.data && subject.data.slice(0, 5).map((subject:any) =>(
                <Button
                key={`${subject.label}-`} 
                href='' className={`w-full justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 ${pathName === '' ? 'bg-gest_cta text-white' : ''} `}>
                  <BookOpenIcon className='w-6 h-6' />
                  <span className='font-semibold ml-1 text-xs w-3/12'>{subject.label}</span>
                </Button>
            ))}
        </div>
    )
}