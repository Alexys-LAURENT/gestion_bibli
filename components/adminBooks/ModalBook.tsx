import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { AuthorType, BookType } from '@/types/AdminPages/entities';
import { Input } from '@nextui-org/input';
import {  Autocomplete,  AutocompleteItem} from "@nextui-org/autocomplete";
import { getAllAuthorsLike } from '@/utils/getAllAuthorsLike';
import { updateBook } from '@/utils/Admin Pages/updateBook';
import { addNewBook } from '@/utils/Admin Pages/addNewBook';

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
  modalData: BookType;
}) {
  const router = useRouter()
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>('');
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newValue, setNewValue] = useState<BookType>({
    id_book: 0,
    id_author: 0,
    title: '',
    year_publication: 0,
    first_sentence: '',
    image_url: '',
    is_loan: false,
  });

  useEffect(() => {
    setNewValue(modalData);
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
        alert('An error occurred');
        onClose();
        router.refresh();
        return;
      }
      setIsLoading(false);
      alert('Book updated');
      onClose();
      router.refresh();
    }else{
      const newBook = await addNewBook({...newValue, name_author: autoCompleteValue});
      console.log('newBook',newBook);
      
      if(newBook.error){
        setIsLoading(false);
        console.error(newBook.message);
        alert('An error occurred');
        onClose();
        router.refresh();
        return;
      }
      setIsLoading(false);
      alert('Book added');
      onClose();
      router.refresh();
    }
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
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={isLoading}
                    color="primary"
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
