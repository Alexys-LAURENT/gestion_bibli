'use client';
// import { ToastContext } from '@/contexts/ToastContext';
// import { deleteAllWhere } from '@/utils/database/deleteAllWhere';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
// import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Spinner } from '@nextui-org/react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
// import { useRouter } from 'next/navigation';
import {  useCallback, useEffect, useMemo, useState } from 'react';
// import { useDisclosure } from '@nextui-org/react';
// import ModalDocument from './ModalDocument';
// import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
// import { updateRowWhere } from '@/utils/database/updateRowWhere';
// import { selectWhere } from '@/utils/database/selectWhere';
import { useDebouncedCallback } from 'use-debounce';
import { BookType } from '@/types/AdminPages/entities';
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
const TableauBooks = ({
  initalBooks,
  initialTotal,
}: {
  initalBooks: BookType[];
  initialTotal: number;
}) => {

  
  // hook for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // custom toast
  // const { customToast } = useContext(ToastContext);
  // router
  // const router = useRouter();
  // data sent to modal
  const [modalData, setModalData] = useState<BookType>({
    id_book: 0,
    id_author: 0,
    title: '',
    year_publication: 0,
    first_sentence: null,
    image_url: null,
    is_loan:false,
  });
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
      key: 'title',
      label: 'Title',
    },
    {
      key: 'year_publication',
      label: 'Year',
    },
    {
      key: 'image_url',
      label: 'Image',
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
        const res = await getAllBooksPaginate(0, 0, `%${value}%`);
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
  }, [page]);

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
  }, [filterValue]);

  // update documents when submitted
  useEffect(() => {
    setBooks(initalBooks);
  }, [initalBooks]);

  // update total when submitted
  useEffect(() => {
    setTotal(initialTotal);
  }, [initialTotal]);

  // function to open modal
  const openModal = (action: 'edit' | 'add', data: BookType) => {
    setModalAction(action);
    setModalData(data);
    onOpen();
  };

  // function to delete documents
  // const handleDelete = async (ids: string[] | 'all' | 'everything') => {
  //   try {
  //     let allPromises: Promise<any>[];
  //     // 'all' is default behavior of NextUI table
  //     if (ids === 'all') {
  //       allPromises = documents.map((doc) => deleteAllWhere('documents', [{ id: doc.id }]));
  //     } else {
  //       if (ids === 'everything') {
  //         allPromises = [deleteAllWhere('documents', [{ id_hapi: HID }])];
  //       } else {
  //         allPromises = ids.map((id) => deleteAllWhere('documents', [{ id: id }]));
  //       }
  //     }
  //     await Promise.all(allPromises);
  //     const message = ids === 'all' || ids.length > 1 ? 'Les documents ont été supprimés.' : 'Le document a été supprimé.';
  //     customToast.success(message);
  //     router.refresh();
  //   } catch (error) {
  //     console.error('TableauBddIA', error);
  //     customToast.error('Une erreur est survenue lors de la suppression des documents. lala');
  //   }
  // };

  // top content of table
  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Books ({total})</h1>
          <div className="flex items-center gap-2">
            {books && books.length > 0 && (
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  // handleDelete('everything');
                }}
              >
                Supprimer tous les documents
              </Button>
            )}
            {((selectedKeys as Set<string>).size > 0 || selectedKeys === 'all') && (
              <Button color="danger" size="sm" 
              onClick={() => {
                // handleDelete(selectedKeys === 'all' ? 'all' : Array.from(selectedKeys))
                }}>
                {selectedKeys === 'all' ? 'Supprimer toute la page' : `Supprimer ${(selectedKeys as Set<string>).size} éléments`}
              </Button>
            )}
            <Button size="sm" color="primary" onClick={() => {
              openModal('add', {
                id_book: 0,
                id_author: 0,
                title: '',
                year_publication: 0,
                first_sentence: null,
                image_url: null,
                is_loan:false,
              })
              }}>
              Ajouter
            </Button>
          </div>
        </div>
        <Input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} size="sm" placeholder="Rechercher un document IA" />
      </>
    );
  }, [selectedKeys, books, filterValue, total]);

  // function to render cell in table
  const renderCell = useCallback(
    (book: BookType, columnKey: keyof BookType | 'actions') => {
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
                    Modifier
                  </DropdownItem>
                  <DropdownItem variant="flat" color="danger" onClick={() => {
                    // handleDelete([action.id])
                    }}>
                    Supprimer
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
          return book[columnKey] ? (
            <div className="flex  justify-center items-center">
              <Image priority={true} src={book[columnKey]} alt={`${book.title} - cover`} width={200} height={300} className="w-24 h-24 rounded-md" />
            </div>
          ) : (
            <div className="flex  justify-center items-center">-</div>
          );
          
        default:
          return (
            cellValue
            // <div
            //   dangerouslySetInnerHTML={{
            //     __html: filterValue
            //       ? (cellValue || '').replace(new RegExp(filterValue, 'gi'), (match) => `<span class="bg-yellow-300/60">${match}</span>`).replace(/\n/g, '<br/>')
            //       : (cellValue || '').replace(/\n/g, '<br/>'),
            //   }}
            // />
          );
      }
    },
    [filterValue],
  );


  return (
    <>
      <ModalBook isOpen={isOpen} onOpenChange={onOpenChange} modalAction={modalAction} modalData={modalData} />
      <Table
        classNames={{ wrapper: 'rounded-md shadow-none border border-gray-300' }}
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
        <TableBody loadingContent={<Spinner />} loadingState={isLoading ? 'loading' : 'idle'} emptyContent={'Aucun documents enregistrés.'} items={books}>
          {(item) => <TableRow key={item.id_book}>{(columnKey) => <TableCell>{renderCell(item, (columnKey as keyof BookType))}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
    </>
  );
};

export default TableauBooks;
