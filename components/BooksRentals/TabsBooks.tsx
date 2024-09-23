"use client"
import { Tabs, Tab } from "@nextui-org/react";
import GetBooksOnDoing from "./GetBooksOnDoing";
import { BooksArg } from "./GetBooksOnDoing";
import { useState } from "react";


const TabsBooks = ({ id_user, books }: BooksArg) => {
  const [tab, setTab] = useState<string>('BooksOD');


  return (
    <div className="flex w-full flex-col">

      <Tabs selectedKey={tab} onSelectionChange={(key) => setTab(String(key))} classNames={{ cursor: "bg-gest_cta", tab: `text-white` }} variant="light" aria-label="Options colors">
        <Tab key="BooksOD" title="On Doing" className={`grid w-full ${tab !== 'BooksOD' ? 'text-black' : 'text-white'}`}>
          <GetBooksOnDoing books={books} id_user={id_user} />
        </Tab>
        <Tab key="BooksD" title="Done" className={tab !== 'BooksD' ? 'text-black' : 'text-white'} />
      </Tabs>



    </div>
  );
};

export default TabsBooks;

