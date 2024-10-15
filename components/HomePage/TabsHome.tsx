"use client"
import { Book } from "@/types/HomePage/entities";
import DisplayBooks from "./DisplayBooks";
import {Tabs, Tab} from "@nextui-org/tabs";

const TabsHome = ({mostReservedBooks,forYouBooks}:{mostReservedBooks:Book[],forYouBooks:Book[]}) => {
    return (
        <Tabs classNames={{cursor:"bg-gest_cta", tab:`text-white`}} variant="light" aria-label="Options colors">
            <Tab key="featured" title="Featured" >
                <DisplayBooks books={forYouBooks}/>
            </Tab>
            <Tab key="mostreservedbooks" title="Most reserved books" >
                <DisplayBooks books={mostReservedBooks}/>
            </Tab>
        </Tabs>
    );
}

export default TabsHome;
  