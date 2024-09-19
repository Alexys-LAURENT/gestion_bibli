import { getSortedBooks } from '@/utils/HomePage/getSortedBooks';
import Image from "next/image";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { useEffect, useState } from 'react';

export default function GetBooks() {

    const [books, setBooks] = useState<any>([])
    
    useEffect(() => {
        async function getData() {
        const res = await getSortedBooks();
        setBooks(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])

    return (
        <div className='flex flex-wrap gap-4 py-4 w-full'>
            {books.data && books.data.map((book: any) => (
                <Card className="grid py-4 w-[120px] h-[191px] py-0">
                    <CardBody className="py-0">
                    <div className='w-[120px]'>
                    <Image
                        alt={book.title}
                        className="absolute top-0 left-0 right-0 bottom-0 object-cover"
                        src={book.image_url || '/no.jpg'}
                        height={100}
                        width={120}
                    />
                    </div>
                    </CardBody>
                    <CardFooter className='flex-col items-end'>
                        <p className="font-bold text-black">{book.title}</p>
                        <small className="text-default-500  text-black">{}</small>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}