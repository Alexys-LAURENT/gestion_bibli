import { getSortedBooks } from '@/utils/HomePage/getSortedBooks';
import {Image} from "@nextui-org/image";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { useEffect, useState } from 'react';

export default function GetBooks() {

    const [books, setBooks] = useState<any>([])
    
    useEffect(() => {
        async function getData(){
        const res = await getSortedBooks();
        console.log('res',res)
        setBooks(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])

    return (
        <div>
            {books.data && books.data.map((book: any) => (
                <Card className="py-4">
                    <CardBody className="overflow-visible py-2">
                    <Image
                        alt={book.title}
                        className="object-cover rounded-xl"
                        src={book.image_url}
                        width={270}
                    />
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}