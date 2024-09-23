import TabsBooks from "@/components/BooksRentals/TabsBooks";
import { FunctionGetAllOnDoingBooks } from "@/utils/BooksRentals/FunctionGetAllOnDoingBooks";

// La page est maintenant asynchrone pour pouvoir récupérer les données
const Page = async () => {
  const id_user = 1;

  // Appel de la fonction pour récupérer les données du côté serveur
  const books = await FunctionGetAllOnDoingBooks(id_user);

  return (
    <div className="flex space-x-4">
      {/* Passe les données récupérées directement au composant */}
      <TabsBooks id_user={id_user} books={books} />
    </div>
  );
};

export default Page;
