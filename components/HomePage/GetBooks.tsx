import FooterCard from "./FooterCard";
import { getSortedBooks } from '@/utils/HomePage/getSortedBooks';
import Image from "next/image";
import {Card, CardHeader, CardBody} from "@nextui-org/card";
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
                <Card className="grid py-4 w-[160px] h-[211px] py-0">
                    <CardBody className="py-0">
                        <Image
                            alt={book.title}
                            className="relative object-cover overflow-hidden"
                            src={book.image_url || '/no.jpg'}
                            height={200}
                            width={160}
                        />
                    </CardBody>
                    <FooterCard book={book}/>
                </Card>
            ))}
        </div>
    );
}