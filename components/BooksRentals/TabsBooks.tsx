"use client"
import { Tabs, Tab } from "@nextui-org/react";
import GetBooksOnDoing from "./GetBooksOnDoing";
import GetBooksDone from "./GetBooksDone" ;
import { useState } from "react";
import { CombinedBooksArgs } from "./BooksArgs"; // Import du type combiné



// Exemple d'utilisation de l'interface BooksArg mise à jour dans TabsBooks
const TabsBooks = ({ id_user, booksOnDoing, booksDone }: CombinedBooksArgs) => {
  const [tab, setTab] = useState<string>('BooksOD');

  return (
      <div className="flex w-full flex-col">
        
          <Tabs 

              selectedKey={tab} 
              onSelectionChange={(key) => setTab(String(key))} 
              classNames={{ cursor: "bg-gest_cta", tab: "text-white" }} 
              variant="light" 
              aria-label="Options colors"
          >
              <Tab key="BooksOD" title="On Doing" className={`grid w-full ${tab !== 'BooksOD' ? 'text-black' : 'text-white'}`}>
                  <GetBooksOnDoing booksOnDoing={booksOnDoing} id_user={id_user} />
              </Tab>

              <Tab key="BooksD" title="Done" className={tab !== 'BooksD' ? 'text-black' : 'text-white'}>
                  <GetBooksDone booksDone={booksDone} id_user={id_user} />
              </Tab>

          </Tabs>
      </div>
  );
};

export default TabsBooks;

