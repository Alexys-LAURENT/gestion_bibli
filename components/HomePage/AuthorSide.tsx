"use client"
import { useEffect, useState } from 'react';
import { getSortedBooks } from '@/utils/HomePage/getSortedBooks';
import AuthorButt from "./AuthorButt";

export default function AuthorSide() {
    const [authors, setAuthors] = useState<any>([])

    useEffect(() => {
        async function getData() {
        const res = await getSortedBooks();
        setAuthors(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])
    return (
        <div>
            <p className="text-xs ml-2 mr-2 font-bold text-black">Popular authors</p>
            {authors.data && authors.data.slice(0, 5).map((author:any) =>(
                <AuthorButt id={author.id_author}/>
            ))}
        </div>
    )
}