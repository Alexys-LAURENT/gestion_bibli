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
import FiltersWrapper from "./FiltersWrapper";
import { getBooksSearchForYouPaginate } from "@/utils/discover/getBooksSearchForYouPaginate";
import { useSearchParams } from "next/navigation";
interface author {
    id_author: number;
    name_author: string;
}

interface subject {
    id_subject: number;
    label: string;
}

const BooksWrapper = () => {
    const searchParams = useSearchParams();

    const [bookNameFilter, setBookNameFilter] = useState<string>(searchParams.get("bookName") || "");
    const [authorsFilter, setAuthorsFilter] = useState<author[]>(searchParams.getAll("authors")[0]?.split("|").map((author) => ({id_author: 0, name_author: author})) || []);
    const [subjectsFilter, setSubjectsFilter] = useState<subject[]>(searchParams.getAll("subjects")[0]?.split("|").map((subject) => ({id_subject: 0, label: subject})) || []);
    const [publishYearFilter, setPublishYearFilter] = useState<any>(searchParams.get("publishYear") || undefined);

    const [selectedTab, setSelectedTab] = useState<any>(bookNameFilter || authorsFilter || subjectsFilter || publishYearFilter ? "search" : "for_you");
    const [booksForYou, setBooksForYou] = useState<any>([]);
    const [booksMostLoaned, setBooksMostLoaned] = useState<any>([]);

    const [offsetForYou, setOffsetForYou] = useState<number>(0);
    const limitForYou = 25;
    const [lastPageForYou, setLastPageForYou] = useState<boolean>(false);
    const [offsetMostLoaned, setOffsetMostLoaned] = useState<number>(0);
    const limitMostLoaned = 25;
    const [lastPageMostLoaned, setLastPageMostLoaned] = useState<boolean>(false);


    const [booksSearch, setBooksSearch] = useState<any>([]);
    const [offsetSearch, setOffsetSearch] = useState<number>(0);
    const [lastPageSearch, setLastPageSearch] = useState<boolean>(false);
    const limitSearch = 25;

    
    useEffect(() => {
        async function getData() {
            const for_you = await getBooksDiscoverForYouPaginate(offsetForYou, limitForYou);
            setBooksForYou(for_you.data)
            setLastPageForYou(for_you.lastPage)
            setOffsetForYou(offsetForYou + limitForYou);
            
            const most_loaned = await getBooksDiscoverMostLoanedPaginate(offsetMostLoaned, limitMostLoaned);
            setBooksMostLoaned(most_loaned.data)
            setOffsetMostLoaned(offsetMostLoaned + limitMostLoaned);
            setLastPageMostLoaned(most_loaned.lastPage);

            if (bookNameFilter || authorsFilter || subjectsFilter || publishYearFilter) {
                fetchSearchData();
            }
        }
        getData();
    }, [])

    const fetchSearchData = async () => {
        const search = await getBooksSearchForYouPaginate(offsetSearch, limitSearch, bookNameFilter, authorsFilter, subjectsFilter, publishYearFilter);
        setBooksSearch(search.data)
        setLastPageSearch(search.lastPage)
        setTimeout(() => {
            setSelectedTab("search");
        } , 100);
    }

    const handleFetchMoreForYou = async () => {
        const res = await getBooksDiscoverForYouPaginate(offsetForYou, limitForYou);
        setOffsetForYou(offsetForYou + limitForYou);
        setBooksForYou([...booksForYou, ...res.data]);
        setLastPageForYou(res.lastPage);
    }

    const handleFetchMoreMostLoaned = async () => {
        const res = await getBooksDiscoverMostLoanedPaginate(offsetMostLoaned, limitMostLoaned);
        setOffsetMostLoaned(offsetMostLoaned + limitMostLoaned);
        setBooksMostLoaned([...booksMostLoaned, ...res.data]);
        setLastPageMostLoaned(res.lastPage);
    }

    const handleFetchMoreSearch = async () => {
        const res = await getBooksSearchForYouPaginate(offsetSearch, limitSearch, bookNameFilter, authorsFilter, subjectsFilter, publishYearFilter);
        setOffsetSearch(offsetSearch + limitSearch);
        setBooksSearch([...booksSearch, ...res.data]);
        setLastPageSearch(res.lastPage);
    }

    const handleTabChange = async (tab: any) => {
        setSelectedTab(tab);
        
        // reset offset and limit
        setOffsetForYou(0);
        setOffsetMostLoaned(0);
        setOffsetSearch(0);
        
        // slice the array to keep only 25 books
        setBooksForYou(booksForYou.slice(0, 25));
        setBooksMostLoaned(booksMostLoaned.slice(0, 25));
        setBooksForYou(booksForYou.slice(0, 25));
    }

    return (
        <div className="flex w-full h-full gap-4">
            <div className="h-full flex flex-col w-full bg-white rounded-md p-4 gap-4 overflow-hidden">
                <Tabs aria-label="Options" classNames={{cursor: "bg-gest_cta", tabContent:'transition-colors duration-200 group-data-[selected=true]:text-white', panel:'w-full h-[calc(100%-50px)]' }} selectedKey={selectedTab} onSelectionChange={(tab) => handleTabChange(tab)}>
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
                    {searchParams.size > 0 &&
                        <Tab key="search" title="Search">
                            <div id="scrollSearch" className="w-full h-full overflow-y-auto">
                                <InfiniteScroll
                                    dataLength={booksSearch.length}
                                    next={() => { handleFetchMoreSearch(); }}
                                    className="flex flex-wrap gap-6 justify-start"
                                    hasMore={!lastPageSearch}
                                    loader={<Spinner color="primary" size="sm" className="w-10 h-10 mx-auto" />}
                                    scrollableTarget="scrollSearch"
                                    endMessage={booksSearch.length > 0 ? null : <p className="text-center w-full text-default-500">No books found for your search</p>}
                                >
                                {booksSearch && booksSearch.map((book: any) => (
                                    <Link href={'#'} key={`book-search-${book.id_book}`} className="flex flex-col gap-4 w-[200px] hover:bg-neutral-200 rounded-md p-2 transition-colors duration-200">
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
                    }
                </Tabs>
            </div>
          <div className="h-full flex min-w-[300px] max-w-[300px] bg-white rounded-md">
            <FiltersWrapper fetchSearchData={fetchSearchData} bookNameFilter={bookNameFilter} setBookNameFilter={setBookNameFilter} authorsFilter={authorsFilter} setAuthorsFilter={setAuthorsFilter} subjectsFilter={subjectsFilter} setSubjectsFilter={setSubjectsFilter} publishYearFilter={publishYearFilter} setPublishYearFilter={setPublishYearFilter} />
          </div>
        </div>
    );
};

export default BooksWrapper;