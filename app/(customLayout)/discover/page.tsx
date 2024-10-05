import BooksWrapper from "@/components/discover/BooksWrapper";
import { getBooksDiscoverForYouPaginate } from "@/utils/discover/getBooksDiscoverForYouPaginate";
import { getBooksDiscoverMostLoanedPaginate } from "@/utils/discover/getBooksDiscoverMostLoanedPaginate";

const Page = async () => {
 
  const {data:initBooksDiscoverForYou} = await getBooksDiscoverForYouPaginate(0, 25);
  const {data:initBooksDiscoverMostLoaned} = await getBooksDiscoverMostLoanedPaginate(0, 25);

  return (
    <div className="flex w-full h-full gap-4">
      <div className="h-full flex flex-col w-full bg-white rounded-md p-4 gap-4">
        <BooksWrapper />
      </div>
      <div className="h-full flex min-w-[300px] bg-white rounded-md"></div>
    </div>
  );
};

export default Page;