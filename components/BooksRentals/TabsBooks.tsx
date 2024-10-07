"use client"
import { Tabs, Tab } from "@nextui-org/react";
import DisplayBooks from "./DisplayBooks";

interface TabsBooksProps {
  booksOnDoing: book[];
  booksDone: book[];
}

type book = {
  authors: { name_author: string };
  id_author: number;
  id_book: number;
  image_url: string | null;
  title: string;
}

// Exemple d'utilisation de l'interface BooksArg mise à jour dans TabsBooks
const TabsBooks = ({ booksOnDoing, booksDone }: TabsBooksProps) => {

  return (
    <div className="flex w-full flex-col">

      <Tabs
        classNames={{ cursor: "bg-gest_cta", tab: "text-white", panel:'bg-white h-full rounded-md'}}
        variant="light"
        aria-label="Options colors"
      >
        <Tab key="BooksOD" title="On Doing">
          <div className="px-4">
          <DisplayBooks books={booksOnDoing}  emptyMessage="No books currently On Doing"/>
          </div>
        </Tab>

        <Tab key="BooksD" title="Done">
        <div className="px-4">
          <DisplayBooks books={booksDone} emptyMessage="No books currently Done" />
          </div>
        </Tab>

      </Tabs>
    </div>
  );
};

export default TabsBooks;

