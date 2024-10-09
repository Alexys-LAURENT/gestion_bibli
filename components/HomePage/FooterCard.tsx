import {CardFooter} from "@nextui-org/card";
import { useEffect, useState } from 'react';
import { getAuthorById } from '@/utils/HomePage/getAuthorById';

export default function FooterCard({book}:{book:any}) {
    const [author, setAuthor] = useState<any>([])

    useEffect(() => {
        async function getData() {
        const res = await getAuthorById(book.id_author);
        setAuthor(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])
    return author.data ? (
        <CardFooter className='flex-col *items-end'>
            <p className="text-xs ml-2 mr-2 font-bold text-black">{book.title}</p>
            <small className="text-default-500  text-black">{author.data.name_author}</small>
        </CardFooter>
    ):(
        <p>no data</p>
    )
}