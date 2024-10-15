'use client';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
import {  useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {  LoanType } from '@/types/AdminPages/entities';
import {Pagination} from "@nextui-org/pagination";
import {Spinner} from "@nextui-org/spinner";
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import {
  useDisclosure
} from "@nextui-org/modal";
import { useRouter } from 'next/navigation';
import ModalRent from './ModalRent';
import React from 'react';
import { getAllRentsPaginate } from '@/utils/Admin Pages/getAllRentsPaginate';
import { Chip } from '@nextui-org/chip';
import moment from 'moment';
import { toggleIsLoan } from '@/utils/toggleIsLoan';
import placeholderImg from '@/public/placeholder.png';
import { ToastContext } from '@/contexts/ToastContext';

const TableauRents = ({
  initialRents,
  initialTotal,
}: {
  initialRents: LoanType[];
  initialTotal: number;
}) => {

  
  // hook for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // custom toast
  // const { customToast } = useContext(ToastContext);
  // router
  const router = useRouter();
  // selected documents in table
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(new Set([]));
  // documents to display
  const [rents, setRents] = useState(initialRents);

  const {customToast} = useContext(ToastContext)

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
      key: 'books.image_url',
      label: 'Cover',
    },
    {
      key: 'books.title',
      label: 'Title',
    },
    {
      key: 'loan_date',
      label: 'Loan date',
    },
    {
      key: 'users.mail',
      label: 'User mail',
    },
    {
      key: 'users.firstname',
      label: 'User firstname',
    },
    {
      key: 'users.lastname',
      label: 'User lastname',
    },
    {
      key: 'is_return',
      label: 'Is return',
    },
    {
      key: 'action',
      label: 'Action',
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
        const res = await getAllRentsPaginate(start, end);
        if(res.error){
          console.error('TableauRents', res.message);
          setRents([])
          setIsLoading(false);
          return;
        }        
        setRents(res.data);
        setIsLoading(false);
      } catch (error) {
        // customToast.error('Une erreur est survenue lors de la récupération des documents.');
        console.error('TableauRents - debouncedPages', error);
        setRents([]);
      }
    },
    // delay in ms
    0,
  );

  // function to get documents when search input changes
  const debouncedFilter = useDebouncedCallback(
    async (value) => {
      try {
        const res = await getAllRentsPaginate(0, 50, `%${value}%`);
        if(res.error){
          console.error('TableauRents - debouncedFilter', res.message);
          setRents([])
          setIsLoading(false);
          return;
        }      
        setRents(res.data);
        setIsLoading(false);
      } catch (error) {
        // customToast.error('Une erreur est survenue lors de la récupération des documents.');
        console.error('TableauRents', error);
        setRents([]);
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
      setRents(initialRents);
    }
  }, [page, debouncedPages, debouncedFilter, initialRents]);

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
    setRents(initialRents);
  }, [initialRents]);

  // update total when submitted
  useEffect(() => {
    setTotal(initialTotal);
  }, [initialTotal]);


  // function to toggle is_return
  const toggleIsReturn = useCallback(async (id_user:number, id_book:number) => {
    try {

        const updatedLoan = await toggleIsLoan(id_book, id_user);

        if(updatedLoan.error){
          customToast.error('An error occurred while updating the rent');
          console.error('TableauRents', updatedLoan.message);
          // customToast.error('Une erreur est survenue lors de la mise à jour du document.');
          return;
        }
        customToast.success('Rent updated successfully');
      // customToast.success(message);
      router.refresh();
    } catch (error) {
      customToast.error('An error occurred while updating the rent');
      console.error('TableauRents', error);
      // customToast.error('Une erreur est survenue lors de la suppression des documents. lala');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // top content of table
  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rents ({total})</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" className='bg-gest_cta text-white' onClick={() => {
              onOpen()
              }}>
              Add rent
            </Button>
          </div>
        </div>
        <Input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} size="sm" placeholder="Search for a book..." />
      </>
    );
  }, [filterValue, total, onOpen]);

  // function to render cell in table
  const renderCell = useCallback(
    (loan: LoanType, columnKey:   'action' | 'is_return' | 'loan_date' | 'books.image_url' | 'books.title' | 'users.mail' | 'users.firstname' | 'users.lastname') => {
      let cellValue = undefined;

      if(columnKey.includes('.')){
        const keys = columnKey.split('.') ;
        cellValue = loan[(keys[0] as unknown as keyof LoanType)][keys[1] as unknown as keyof LoanType[keyof LoanType]];
      }else{
        if(columnKey === 'action'){
          cellValue = undefined;
        }else{
          if(columnKey === 'is_return'){
            cellValue = loan[columnKey] ? 'Yes' : 'No';
          }else{
            cellValue = loan[columnKey as keyof LoanType];
          }
        }
      } 

      switch (columnKey) {
        case 'action':
          return (
            <Button size="sm" className='bg-gest_cta text-white' onClick={() => toggleIsReturn(loan.id_user, loan.id_book)}>
              {loan.is_return ? 'Set as not returned' : 'Set as returned'}
            </Button>
          );
        case 'is_return':
          return (
            <Chip variant='flat' size='sm' color={cellValue === 'No' ? 'danger' : cellValue === 'Yes' ? 'success' : 'default'}>{cellValue!.toString()}</Chip>
          );

          case 'loan_date':
          return (
            // use moment to format date at french format
            <div>
              {moment((cellValue as string)).format('DD/MM/YYYY')}
            </div>
          );
        case 'books.image_url':
          return (

            <div className="flex  justify-center items-center">
              <Image priority={true} src={loan.books.image_url || placeholderImg.src} alt={`${loan.books.title} - cover`} width={200} height={300} className="w-16 h-auto rounded-md" />
            </div>
            )

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
    [filterValue,toggleIsReturn],
  );


  return (
    <>
    <div className='h-full overflow-y-auto '> 
      <ModalRent isOpen={isOpen} onOpenChange={onOpenChange} />
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
        selectionBehavior={'replace'}
        aria-label="Example table with dynamic content"
      >
        <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState={isLoading ? 'loading' : 'idle'} emptyContent={'No Rents.'} items={rents}>
          {(item) => <TableRow key={item.id_book}>{(columnKey) => <TableCell>{renderCell(item, (columnKey as never)) as React.ReactNode}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
    </div>

    </>
  );
};

export default TableauRents;
