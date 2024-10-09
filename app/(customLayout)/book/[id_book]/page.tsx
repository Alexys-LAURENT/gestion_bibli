import { Image } from "@nextui-org/image";
import { getBookById } from "@/utils/getBookById";
import { redirect } from 'next/navigation';
import RentButton from '@/components/BookPage/RentButton';
import { auth } from '@/utils/auth';
import ListSubjects from '@/components/BookPage/ListSubjects';
import Link from 'next/link';
import { Chip } from "@nextui-org/chip";

const Page = async ({ params }: { params: { id_book: string } }) => {
  const session = await auth()
  const { data: book } = await getBookById(parseInt(params.id_book));
  

  if(!book) redirect('/home')

  return (
    <div className="w-full h-full bg-white p-8 rounded-md flex flex-col lg:flex-row lg:space-x-8">
      {/* Image du livre */}
      <div className="w-full max-w-[350px]">
        {book.image_url ? (
          <Image
            src={book.image_url}
            alt={book.title}
            width={600}
            height={600}
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div> // Placeholder pour image manquante
        )}
      </div>

      {/* Détails du livre */}
      <div className="lg:w-2/3">
        {/* Titre du livre */}
        <h1 className="text-4xl font-bold mb-2">{book.title}</h1>

        {/* Auteur */}
        <Chip variant="faded" size="lg" className="text-lg font-medium text-gray-600 mb-2" as={Link} href={`/discover?authors=${book.authors?.name_author || ''}`}>
          {/* <p className={`text-2xl font-medium text-gray-600 cursor-pointer py-2`}> */}
            {book.authors?.name_author || "Unknown author"}
          {/* </p> */}
        </Chip>

        {/* Année de publication */}
        <p className="text-lg font-semibold mb-2 flex gap-1 items-center">Publish year: 
          <Chip variant="faded" size="sm" as={Link} href={`/discover?publishYear=${book.year_publication || ''}`}>
            {book.year_publication || "Unknown year"}
          </Chip>
        </p>

        {/* Première phrase */}
        <p className="text-base font-light text-gray-700 mb-4">
          First Sentence: {book.first_sentence || "Unknown first sentence"}
        </p>

        {/* Sujets */}
        <ListSubjects books_subjects={book.books_subjects} />

        {/* Bouton de location */}
        <RentButton session={session} is_loan={book.is_loan} loan_data={book.loan} id_book={book.id_book} />
      </div>
    </div>
  );
};

export default Page;