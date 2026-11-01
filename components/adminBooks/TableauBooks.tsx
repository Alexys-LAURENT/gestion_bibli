'use client';


import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import placeholderImg from '@/public/placeholder.png';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';

import {  useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {  BookTypeWithAuthor } from '@/types/AdminPages/entities';
import {Pagination} from "@nextui-org/pagination";
import {Spinner} from "@nextui-org/spinner";
import { getAllBooksPaginate } from '@/utils/Admin Pages/getAllBooks';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem} from "@nextui-org/dropdown";
import Image from 'next/image';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import ModalBook from './ModalBook';
import {
  useDisclosure
} from "@nextui-org/modal";
import { deleteBook } from '@/utils/Admin Pages/deleteBook';
import { useRouter } from 'next/navigation';
import { ToastContext } from '@/contexts/ToastContext';
const TableauBooks = ({
  initalBooks,
  initialTotal,
}: {
  initalBooks: BookTypeWithAuthor[];
  initialTotal: number;
}) => {

  
  // hook for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // custom toast
  // const { customToast } = useContext(ToastContext);
  // router
  const router = useRouter();
  // data sent to modal
  const [modalData, setModalData] = useState<BookTypeWithAuthor>({
    id_book: 0,
    title: '',
    year_publication: 0,
    first_sentence: null,
    image_url: null,
    is_loan:false,
    authors: {
      id_author: 0,
      name_author: '',
    },
  });
  const {customToast} = useContext(ToastContext)

  // modal action
  const [modalAction, setModalAction] = useState<'edit' | 'add'>('edit');
  // selected documents in table
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(new Set([]));
  // documents to display
  const [books, setBooks] = useState(initalBooks);
  // page number
  const [page, setPage] = useState(1);
  // search input value
  const [filterValue, setFilterValue] = useState<undefined | string>(undefined);
  // total number of documents
  const [total, setTotal] = useState(initialTotal);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // columns in table
  const columns = [
    {
      key: 'image_url',
      label: 'Image',
    },
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'authors',
      label: 'Author',
    },
    {
      key: 'year_publication',
      label: 'Year',
    },
    {
      key: 'is_loan',
      label: 'Available',
    },
    {
      key: 'actions',
      label: 'Actions',
    },
  ];
  // number of pages
  const pages = useMemo(() => {
    return Math.ceil(total / 20);
  }, [total]);

  // function to get documents when page changes
  const debouncedPages = useDebouncedCallback(
    async () => {
      try {
        const start = (page - 1) * 20;
        const end = start + 20 - 1;
        const res = await getAllBooksPaginate(start, end);
        if(res.error){
          console.error('TableauBddIA', res.message);
          setBooks([])
          setIsLoading(false);
          return;
        }        
        setBooks(res.data);
        setIsLoading(false);
      } catch (error) {
        // customToast.error('Une erreur est survenue lors de la récupération des documents.');
        console.error('TableauBddIA - debouncedPages', error);
        setBooks([]);
      }
    },
    // delay in ms
    0,
  );

  // function to get documents when search input changes
  const debouncedFilter = useDebouncedCallback(
    async (value) => {
      try {
        const res = await getAllBooksPaginate(0, 50, `%${value}%`);
        if(res.error){
          console.error('TableauBddIA - debouncedFilter', res.message);
          setBooks([])
          setIsLoading(false);
          return;
        }      
        setBooks(res.data);
        setIsLoading(false);
      } catch (error) {
        // customToast.error('Une erreur est survenue lors de la récupération des documents.');
        console.error('TableauBddIA', error);
        setBooks([]);
      }
    },
    // delay in ms
    700,
  );

  // trigger when page changes
  useEffect(() => {
    const callDebouncePage = async () => {
      setIsLoading(true);
      await debouncedPages();
    };
    if (page > 1) {
      debouncedFilter.cancel();
      callDebouncePage();
    } else {
      setBooks(initalBooks);
    }
  }, [page, debouncedPages, debouncedFilter, initalBooks]);

  // trigger when search input changes
  useEffect(() => {
    if (filterValue === undefined) return;
    const callDebounceFilter = async () => {
      setIsLoading(true);
      await debouncedFilter(filterValue);
    };
    const callDebouncePage = async () => {
      setIsLoading(true);
      await debouncedPages();
    };
    if (filterValue) {
      debouncedPages.cancel();
      callDebounceFilter();
    } else {
      debouncedFilter.cancel();
      callDebouncePage();
    }
  }, [filterValue, debouncedPages, debouncedFilter]);

  // update documents when submitted
  useEffect(() => {
    setBooks(initalBooks);
  }, [initalBooks]);

  // update total when submitted
  useEffect(() => {
    setTotal(initialTotal);
  }, [initialTotal]);

// function to open modal
const openModal = useCallback((action: 'edit' | 'add', data: BookTypeWithAuthor) => {
  setModalAction(action);
  setModalData(data);
  onOpen();
}, [setModalAction, setModalData, onOpen]);

  // function to delete documents
  const handleDelete = useCallback(async (ids: string[] | 'all') => {
    try {
      let allPromises: Promise<unknown>[];
      // 'all' is default behavior of NextUI table
      if (ids === 'all') {
        allPromises = books.map((book) => deleteBook(book.id_book));
      } else {
        allPromises = ids.map((id) => deleteBook(parseInt(id)));
      }
      await Promise.all(allPromises);
      const message = ids === 'all' || ids.length > 1 ? 'Books deleted.' : 'Book deleted.';
      customToast.success(message);
      // customToast.success(message);
      router.refresh();
    } catch (error) {
      console.error('TableauBddIA', error);
      // customToast.error('Une erreur est survenue lors de la suppression des documents. lala');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, router]);

  // top content of table
  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Books ({total})</h1>
          <div className="flex items-center gap-2">
            {((selectedKeys as Set<string>).size > 0 || selectedKeys === 'all') && (
              <Button color="danger" size="sm" 
              onClick={() => {
                handleDelete(selectedKeys === 'all' ? 'all' : Array.from(selectedKeys))
                }}>
                {selectedKeys === 'all' ? 'Delete all page' : `Delete ${(selectedKeys as Set<string>).size} book(s)`}
              </Button>
            )}
            <Button size="sm" className='bg-gest_cta text-white' onClick={() => {
              openModal('add', {
                id_book: 0,
                title: '',
                year_publication: 0,
                first_sentence: null,
                image_url: null,
                is_loan:false,
                authors: {
                  id_author: 0,
                  name_author: '',
                },
              })
              }}>
              Add book
            </Button>
          </div>
        </div>
        <Input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} size="sm" placeholder="Search for a book..." />
      </>
    );
  }, [selectedKeys, filterValue, total, openModal,handleDelete]);

  // function to render cell in table
  const renderCell = useCallback(
    (book: BookTypeWithAuthor, columnKey: keyof BookTypeWithAuthor | 'actions') => {
      const cellValue = columnKey === 'actions' ? undefined : book[columnKey] 

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      openModal('edit',book);
                    }}
                  >
                    Update
                  </DropdownItem>
                  <DropdownItem variant="flat" color="danger" onClick={() => {
                    handleDelete([book.id_book.toString()])
                    }}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case 'is_loan':
          return (
            <div className="flex  justify-center items-center">
              {
                book[columnKey] ?  <XCircleIcon className="w-6 h-6 text-red-500" />:<CheckCircleIcon className="w-6 h-6 text-green-500" />  
              }
            </div>
          );

        case 'image_url':
          return (
            <div className="flex justify-start items-center">
            <Image priority={true} src={book.image_url || placeholderImg.src} alt={`${book.title} - cover`} width={200} height={300} className="w-16 h-auto rounded-md" />
          </div>
          )
        case 'authors':
          return (
            <div className="flex  justify-center items-center">
              {book[columnKey].name_author}
            </div>
          );
        default:
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: filterValue
                  ? (cellValue || '').toString().replace(new RegExp(filterValue, 'gi'), (match) => `<span class="bg-yellow-300/60">${match}</span>`).replace(/\n/g, '<br/>')
                  : (cellValue || '').toString().replace(/\n/g, '<br/>'),
              }}
            />
          );
      }
    },
    [openModal,filterValue,handleDelete],
  );


  return (
    <>
    <div className='h-full overflow-y-auto '> 

      <ModalBook key={modalData.id_book} isOpen={isOpen} onOpenChange={onOpenChange} modalAction={modalAction} modalData={modalData} />
      <Table
        classNames={{ wrapper: 'rounded-md shadow-none ' }}
        color="primary"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string> | string)}
        topContent={topContent}
        bottomContent={
          pages > 1 && !filterValue ? (
            <div className="flex w-full justify-center">
              <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={(page) => setPage(page)} />
            </div>
          ) : null
        }
        selectionBehavior={'toggle'}
        selectionMode={'multiple'}
        aria-label="Example table with dynamic content"
      >
        <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState={isLoading ? 'loading' : 'idle'} emptyContent={'No books.'} items={books}>
          {(item) => <TableRow key={item.id_book}>{(columnKey) => <TableCell>{renderCell(item, (columnKey as keyof BookTypeWithAuthor)) as React.ReactNode}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
    </div>

    </>
  );
};

export default TableauBooks;
