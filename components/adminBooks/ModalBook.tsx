import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { AuthorType, BookTypeWithAuthor } from '@/types/AdminPages/entities';
import { Input } from '@nextui-org/input';
import {  Autocomplete,  AutocompleteItem} from "@nextui-org/autocomplete";
import { getAllAuthorsLike } from '@/utils/getAllAuthorsLike';
import { updateBook } from '@/utils/Admin Pages/updateBook';
import { addNewBook } from '@/utils/Admin Pages/addNewBook';
import React from 'react';
import { ToastContext } from '@/contexts/ToastContext';

const Modal = dynamic(() => import('@nextui-org/modal').then((mod) => mod.Modal));
const ModalContent = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalContent));
const ModalHeader = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalHeader));
const ModalBody = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalBody));
const ModalFooter = dynamic(() => import('@nextui-org/modal').then((mod) => mod.ModalFooter));

export default function ModalBook({
  isOpen,
  onOpenChange,
  modalAction,
  modalData,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  modalAction: 'edit' | 'add';
  modalData: BookTypeWithAuthor;
}) {
  const router = useRouter()
  const {customToast} = useContext(ToastContext)
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>(modalData.authors?.name_author || '');
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newValue, setNewValue] = useState<BookTypeWithAuthor>({
    id_book: 0,
    title: '',
    year_publication: 0,
    first_sentence: '',
    image_url: '',
    is_loan: false,
    authors: {
      id_author: 0,
      name_author: '',
    },
  });

  useEffect(() => {
    setNewValue(modalData);
  }, [modalData]);

  useEffect(() => {
    setAutoCompleteValue(modalData.authors?.name_author || '');
  }, [modalData]);


  useEffect(() => {    
    const fetchAuthors = async () => {
      const { data } = await getAllAuthorsLike(autoCompleteValue);
      
      setAuthors(data);
    };
    fetchAuthors();
  }, [autoCompleteValue]);

  const is_disabled = () =>{
    if(newValue.title === '' || newValue.year_publication <= 0 || autoCompleteValue === ''){
      return true;
    }
    return false;
  }

  const handleSubmit = async (onClose: () => void) => {
    if (is_disabled()) return;
    setIsLoading(true);
    if(modalAction === 'edit'){
      const updatedBook = await updateBook({...newValue, name_author: autoCompleteValue});
      if(updatedBook.error){
        setIsLoading(false);
        console.error(updatedBook.message);
        customToast.error('An error occurred');
        onClose();
        reset_data();
        router.refresh();
        return;
      }
      setIsLoading(false);
      customToast.success('Book updated');
      onClose();
      reset_data();
      router.refresh();
    }else{
      const newBook = await addNewBook({...newValue, name_author: autoCompleteValue});
      
      if(newBook.error){
        setIsLoading(false);
        console.error(newBook.message);
        customToast.error('An error occurred');
        onClose();
        reset_data();
        router.refresh();
        return;
      }
      setIsLoading(false);
      customToast.success('Book added');
      onClose();
      reset_data();
      router.refresh();
    }
  }

  const reset_data = () => {
    setNewValue({
      id_book: 0,
      title: '',
      year_publication: 0,
      first_sentence: '',
      image_url: '',
      is_loan: false,
      authors: {
        id_author: 0,
        name_author: '',
      },
    });
  }

  const close = (onClose: () => void) => {
    onClose();
    reset_data();
  }


  return (
    <>
      {isOpen && (
        <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {modalAction === 'edit' ? 'Edit a book' : 'Add a book'}
                </ModalHeader>
                <ModalBody>
                  <Input label="Title" value={newValue.title} onChange={(e) => setNewValue({ ...newValue, title: e.target.value })} />
                  <Input type='number' label="Publish Year" value={newValue.year_publication.toString()} onChange={(e) => setNewValue({ ...newValue, year_publication: parseInt(e.target.value) })} />
                  <Input label="First Sentence" value={newValue.first_sentence || ''} onChange={(e) => setNewValue({ ...newValue, first_sentence: e.target.value })} />
                  <Autocomplete 
                  value={autoCompleteValue}
                  onValueChange={setAutoCompleteValue}
                  onSelectionChange={(value)=>setAutoCompleteValue(value as string)}
                  label="Select an author" 
                  allowsCustomValue
                  defaultSelectedKey={autoCompleteValue}
                >
                {authors && authors.map((author) => (
                  <AutocompleteItem key={author.name_author} value={author.name_author}>
                    {author.name_author}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

                  <Input label="Image URL" value={newValue.image_url || ''} onChange={(e) => setNewValue({ ...newValue, image_url: e.target.value })} />
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
                    {modalAction === 'edit' ? 'Edit' : 'Add'}
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
