import { getAllBooksPaginate } from "@/utils/Admin Pages/getAllBooks";
import TableauBooks from "./TableauBooks";
import { BookTypeWithAuthor } from "@/types/AdminPages/entities";
import { getAllBooksCount } from "@/utils/Admin Pages/getAllBooksCount";
const TableauSuspense = async () => {

  const {data:books} = await getAllBooksPaginate(0,19);
  
  const {data:count} = await getAllBooksCount();
  
  return (
    <TableauBooks
      initalBooks={
        (books as BookTypeWithAuthor[]) || []
      }
      initialTotal={count || 0}
    />
  );
};

export default TableauSuspense;
