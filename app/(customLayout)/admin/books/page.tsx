import TableauSuspense from "@/components/adminBooks/TableauSuspense";
import { Suspense } from "react";
import {Skeleton} from "@nextui-org/skeleton";
const Page = async () => {
  
  return (
    <Suspense fallback={<Skeleton className="w-full h-52 rounded-md" />}>
    <TableauSuspense />
  </Suspense>

  );
};

export default Page;