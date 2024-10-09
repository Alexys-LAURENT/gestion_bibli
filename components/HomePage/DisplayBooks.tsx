import Image from "next/image";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import { Book } from "@/types/HomePage/entities";


export default function DisplayBooks({books}:{books:Book[]}) {
    return (
        <div className='flex max-h-[calc(100svh-160px)] scrollbar-custom overflow-y-auto flex-wrap gap-4 py-4 w-full'> 
            {books && books.length>0 && books.map((book) => (
                <Card key={`book-${book.id_book}`} className="grid w-[158px] h-[211px] py-0">
                    <CardBody className="py-0">
                        {
                            book.image_url ? ( <Image
                                alt={book.title}
                                className="relative object-cover overflow-hidden w-[158px] h-auto"
                                src={book.image_url || '/no.jpg'}
                                height={200}
                                width={158}
                            />) : (
                                <div className="w-[158px] h-[200px] bg-gray-300 rounded-md flex items-center justify-center">
                                        <span className="text-tiny">No cover available</span>
                                    </div>
                            )
                        }
                       
                    </CardBody>
                    <CardFooter className='flex-col *items-end'>
                        <p className="text-xs ml-2 mr-2 font-bold text-black">{book.title}</p>
                        <small className="text-black">{book.authors.name_author}</small>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}