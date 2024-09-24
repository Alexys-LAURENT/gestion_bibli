// File: /app/page.tsx
import TabsBooks from "@/components/BooksRentals/TabsBooks";
import { FunctionGetAllOnDoingBooks } from "@/utils/BooksRentals/FunctionGetAllOnDoingBooks";
import { FunctionGetAllDoneBooks } from "@/utils/BooksRentals/FunctionGetAllDoneBooks";

// La page est maintenant asynchrone pour pouvoir récupérer les données
const Page = async () => {
  const id_user = 1;

  // Appel des fonctions pour récupérer les données du côté serveur
  const booksOnDoing = await FunctionGetAllOnDoingBooks(id_user);
  const booksDone = await FunctionGetAllDoneBooks(id_user);

  return (
    <div className="flex space-x-4">
      {/* Passe les données récupérées directement au composant */}
      <TabsBooks id_user={id_user} booksOnDoing={booksOnDoing} booksDone={booksDone} />
    </div>
  );
};

export default Page;
