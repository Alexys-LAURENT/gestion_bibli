import FooterCard from "./FooterCard";
import { getSortedBooks, getAllBooks } from '@/utils/HomePage/getSortedBooks';
import Image from "next/image";
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import { useEffect, useState, useMemo } from 'react';
import { getAllBooksCount } from "@/utils/Admin Pages/getAllBooksCount";
import {Pagination} from "@nextui-org/pagination";

export default function GetBooks({filter}:{filter:string}) {
    const [books, setBooks] = useState<any>([])
    const [pages, setPages] = useState<any>([])
    const [page, setPage] = useState(1);
    
    if (filter == "mostreserved") {
        useEffect(() => {
            async function getData() {
            const res = await getSortedBooks();
            setBooks(res)
            const initialTotal = res.data.length;
            setPages(Math.ceil(initialTotal / 20));
            if (res.error) {
                return <p>Erreur : {res.message}</p>;
            }
        }
        getData();
        }, [])
    } else {
        useEffect(() => {
            async function getData() {
                const res = await getAllBooks();
                const initialTotal = await getAllBooksCount();
                setPages(Math.ceil(initialTotal.data / 20));
                setBooks(res)
                if (res.error) {
                    return <p>Erreur : {res.message}</p>;
                }
        }
        getData();
        }, [])
    }
    return (
        <div className='flex flex-wrap gap-4 py-4 w-full'>
            {books.data && books.data.slice(((page - 1) * 20), (page * 20)).map((book: any) => (
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
            <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={(page) => setPage(page)}/>
        </div>
    );
}