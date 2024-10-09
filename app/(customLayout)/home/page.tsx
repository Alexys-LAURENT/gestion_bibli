import TabsHome from "@/components/HomePage/TabsHome";
import AuthorSide from "@/components/HomePage/AuthorSide";
import SubjectSide from "@/components/HomePage/SubjectSide";
import { getAllBooks } from "@/utils/HomePage/getAllBooks";
import { getMostReservedBooks } from "@/utils/HomePage/getMostReservedBooks";

const Page = async () => {
  const mostReservedBooks = await getMostReservedBooks(25);
  if(mostReservedBooks.error){
      return <p>Une erreur est survenue, veuillez réessayer plus tard</p>
  }
  const forYouBooks = await getAllBooks(25);
  if(forYouBooks.error){
    return <p>Une erreur est survenue, veuillez réessayer plus tard</p>
}

  return (
    <div className="flex gap-8">
      <div className='w-full lg:min-w-9/12 flex bg-white p-4 rounded-xl flex-col'>
        <TabsHome mostReservedBooks={mostReservedBooks.data} forYouBooks={forYouBooks.data}/>
      </div>
      <div className="hidden lg:block gap-8 w-3/12 max-w-[300px] ">
        <div className='flex bg-white p-4 rounded-xl flex-col'>
          <AuthorSide/>
        </div>
        <div className='flex bg-white mt-8 p-4 rounded-xl flex-col'>
          <SubjectSide/>
        </div>
      </div>
    </div>
  );
}

export default Page;
