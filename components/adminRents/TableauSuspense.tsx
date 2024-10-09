import TableauRents from "./TableauRents";
import { getAllRentsPaginate } from "@/utils/Admin Pages/getAllRentsPaginate";
import { LoanType } from '../../types/AdminPages/entities';
import { getAllRentsCount } from "@/utils/Admin Pages/getAllRentsCount";
const TableauSuspense = async () => {

  const {data:rents} = await getAllRentsPaginate(0,19);
  
  const {data:count} = await getAllRentsCount();
  
  return (
    <TableauRents
      initialRents={
        (rents as LoanType[]) || []
      }
      initialTotal={count || 0}
    />
  );
};

export default TableauSuspense;
