import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import {  Autocomplete,  AutocompleteItem} from "@nextui-org/autocomplete";
import React from 'react';
import { getAllBooksPaginate } from '@/utils/Admin Pages/getAllBooks';
import { getAllusersLike } from '@/utils/Admin Pages/getAllUsersLike';
import {DateInput} from "@nextui-org/date-input";
import {DateValue, parseDate} from "@internationalized/date";
import { createRent } from '@/utils/Admin Pages/createRent';


const Modal = dynamic(() => import('@nextui-org/modal').then((mod) => mod.Modal));
const ModalContent = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalContent));
const ModalHeader = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalHeader));
const ModalBody = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalBody));
const ModalFooter = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalFooter));

export default function ModalRent({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter()
  const [autoCompleteBooksValue, setAutoCompleteBooksValue] = useState<string>('');
  const [autoCompleteUserValue, setAutoCompleteUserValue] = useState<string>('');
  const [idSelectedBook, setIdSelectedBook] = useState<number>(0);
  const [idSelectedUser, setIdSelectedUser] = useState<number>(0);
  const [books, setBooks] = useState<{id_book:number, title:string, image_url:string}[]>([]);
  const [users, setUsers] = useState<{id_user:number, firstname:string, lastname:string, mail:string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-04-04"));


  useEffect(() => {    
    const fetchBooks = async () => {
      const { data } = await getAllBooksPaginate(0, 20, `%${autoCompleteBooksValue}%`);
      setBooks(data);
    };
    fetchBooks();
  }, [autoCompleteBooksValue]);

  useEffect(() => {    
    const fetchUsers = async () => {
      const { data } = await getAllusersLike(autoCompleteUserValue);
      setUsers(data);
    };
    fetchUsers();
  }, [autoCompleteUserValue]);

  const is_disabled = () =>{
    if(idSelectedBook === 0 || idSelectedUser === 0) return true;
    if(idSelectedBook === null || idSelectedUser === null) return true;
    if(!value) return true;
    if(value.toString() === '') return true;
    return false;
  }

  const handleSubmit = async (onClose: () => void) => {
    if (is_disabled()) return;
    setIsLoading(true);
    const newRentResult = await createRent(idSelectedBook, idSelectedUser, value.toString());
    if(newRentResult.error){
      alert('An error occurred while creating the rent');
      console.error(newRentResult.message);
      setIsLoading(false);
      router.refresh();
      return;
    }
    alert('Rent created successfully');
    setIsLoading(false);
    onClose();
    router.refresh();
  }

  const reset_data = () => {
   setBooks([]);
    setUsers([]);
    setAutoCompleteBooksValue('');
    setAutoCompleteUserValue('');
  }

  const close = (onClose: () => void) => {
    onClose();
    reset_data();
  }


  return (
    <>
      {isOpen && (
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                Add a new rent
                </ModalHeader>
                <ModalBody>
                  <Autocomplete 
                  onValueChange={setAutoCompleteBooksValue}
                  onSelectionChange={(value)=>setIdSelectedBook(Number(value))}
                  label="Select a book" 
                  value={idSelectedBook}
                >
                {books && books.map((book) => (
                  <AutocompleteItem key={book.id_book} value={book.title}>
                    {book.title}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete 
                  value={idSelectedUser}
                  onValueChange={setAutoCompleteUserValue}
                  onSelectionChange={(value)=>setIdSelectedUser(Number(value))}
                  label="Select a user" 
                >
                {users && users.map((user) => (
                  <AutocompleteItem key={user.id_user} value={user.firstname}>
                    {user.firstname + ' ' + user.lastname + ' (' + user.mail + ')'} 
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <DateInput label="Rent date" value={value} onChange={setValue} />

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={() => close(onClose)}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={isLoading}
                    className='bg-gest_cta text-white'
                    onPress={() => handleSubmit(onClose)}
                    isDisabled={is_disabled()}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
