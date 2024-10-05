"use client"
import {Tabs, Tab} from "@nextui-org/tabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import placeholderImg from "@/public/placeholder.png";
import { getBooksDiscoverForYouPaginate } from "@/utils/discover/getBooksDiscoverForYouPaginate";
import { getBooksDiscoverMostLoanedPaginate } from "@/utils/discover/getBooksDiscoverMostLoanedPaginate";
import { Spinner } from "@nextui-org/spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const BooksWrapper = () => {
    const [selectedTab, setSelectedTab] = useState<any>("for_you");
    const [booksForYou, setBooksForYou] = useState<any>([]);
    const [booksMostLoaned, setBooksMostLoaned] = useState<any>([]);
    const [offsetForYou, setOffsetForYou] = useState<number>(0);
    const limitForYou = 25;
    const [offsetMostLoaned, setOffsetMostLoaned] = useState<number>(0);
    const limitMostLoaned = 25;

    useEffect(() => {
        async function getData() {

            const for_you = await getBooksDiscoverForYouPaginate(offsetForYou, limitForYou);
            setBooksForYou(for_you.data)
            setOffsetForYou(offsetForYou + limitForYou);

            const most_loaned = await getBooksDiscoverMostLoanedPaginate(offsetMostLoaned, limitMostLoaned);
            setBooksMostLoaned(most_loaned.data)
            setOffsetMostLoaned(offsetMostLoaned + limitMostLoaned);

        }
    getData();
    }, [])

    const handleFetchMoreForYou = async () => {
        const res = await getBooksDiscoverForYouPaginate(offsetForYou, limitForYou);
        setOffsetForYou(offsetForYou + limitForYou);
        setBooksForYou([...booksForYou, ...res.data]);
    }

    const handleFetchMoreMostLoaned = async () => {
        const res = await getBooksDiscoverMostLoanedPaginate(offsetMostLoaned, limitMostLoaned);
        setOffsetMostLoaned(offsetMostLoaned + limitMostLoaned);
        setBooksMostLoaned([...booksMostLoaned, ...res.data]);
    }

    const handleTabChange = async (tab: any) => {
        setSelectedTab(tab);
        
        // // reset offset and limit
        // setOffsetForYou(0);
        // setOffsetMostLoaned(0);
        
        // // slice the array to keep only 25 books
        // setBooksForYou(booksForYou.slice(0, 25));
        // setBooksMostLoaned(booksMostLoaned.slice(0, 25));
    }

    return (
        <Tabs aria-label="Options" classNames={{cursor: "bg-gest_cta", tabContent:'transition-colors duration-200 group-data-[selected=true]:text-white', panel:'w-full h-full' }} selectedKey={selectedTab} onSelectionChange={(tab) => handleTabChange(tab)}>
        <Tab key="for_you" title="For you">
            <div id="scrollForYou" className="w-full h-full overflow-y-auto">
                <InfiniteScroll
                    dataLength={booksForYou.length} 
                    next={() => { handleFetchMoreForYou(); }}
                    className="flex flex-wrap gap-6 justify-start"
                    hasMore={true}
                    loader={<Spinner color="primary" size="sm" className="w-10 h-10 mx-auto" />}
                    scrollableTarget="scrollForYou"
                >
                {
                    booksForYou && booksForYou.map((book: any) => (
                            <Link href={'#'} key={`book-for-you-${book.id_book}`} className="flex flex-col gap-4 w-[200px] hover:bg-neutral-200 rounded-md p-2 transition-colors duration-200">
                                <Image src={book.image_url || placeholderImg} alt={book.title} className="w-full h-[250px] object-cover rounded-sm" width={250} height={300}/>
                                <div className="flex flex-1 flex-col justify-between">
                                    <p className="text-black font-bold line-clamp-2" title={book.title}>{book.title}</p>
                                    <p className="text-default-500 text-sm">{book.authors.name_author}</p>
                                </div>
                            </Link>
                    ))
                }
                </InfiniteScroll>
            </div>
        </Tab>
        <Tab key="most_loaned" title="Most loaned">
            <div id="scrollMostLoaned" className="w-full h-full overflow-y-auto">
                <InfiniteScroll
                    dataLength={booksMostLoaned.length}
                    next={() => { handleFetchMoreMostLoaned(); }}
                    className="flex flex-wrap gap-6 justify-start"
                    hasMore={true}
                    loader={<Spinner color="primary" size="sm" className="w-10 h-10 mx-auto" />}
                    scrollableTarget="scrollMostLoaned"
                >
                {booksMostLoaned && booksMostLoaned.map((book: any) => (
                    <Link href={'#'} key={`book-most-loaned-${book.id_book}`} className="flex flex-col gap-4 w-[200px] hover:bg-neutral-200 rounded-md p-2 transition-colors duration-200">
                        <Image src={book.image_url || placeholderImg} alt={book.title} className="w-full h-[250px] object-cover rounded-sm" width={250} height={300}/>
                        <div className="flex flex-1 flex-col justify-between">
                        <p className="text-black font-bold line-clamp-2" title={book.title}>{book.title}</p>
                        <p className="text-default-500 text-sm">{book.authors.name_author}</p>
                        </div>
                    </Link>
                ))}
                </InfiniteScroll>
            </div>
        </Tab>
      </Tabs>
    );
};

export default BooksWrapper;