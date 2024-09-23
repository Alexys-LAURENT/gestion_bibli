"use server"
import { FunctionGetAllDoneBooks } from "@/utils/BooksRentals/FunctionGetAllDoneBooks";
import { useState } from "react";
import { useEffect } from "react";


export default function GetBooksOnDoing() {

    const [books, setBooks] = useState<any>([])
    
    useEffect(() => {
        async function getData() {
        const res = await FunctionGetAllDoneBooks();
        setBooks(res)
        if (res.error) {
            return <p>Erreur : {res.message}</p>;
        }
    }
    getData();
    }, [])

    return ([]

    );

    

}



