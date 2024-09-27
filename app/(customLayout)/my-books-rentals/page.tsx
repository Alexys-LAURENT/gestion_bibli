import TabsBooks from "@/components/BooksRentals/TabsBooks";
import { FunctionGetAllOnDoingBooks } from "@/utils/BooksRentals/FunctionGetAllOnDoingBooks";
import { FunctionGetAllDoneBooks } from "@/utils/BooksRentals/FunctionGetAllDoneBooks";
import { auth } from "@/utils/auth"; 

const Page = async () => {
  // Fonction d'authentification pour obtenir la session utilisateur
  const session = await auth();
  console.log("Session utilisateur :", session);

  // Vérifie si la session ou l'utilisateur est présent
  if (!session || !session.user || !session.user.id_user) {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  const id_user = session.user.id_user;

  // Fonctions pour récupérer les données du côté serveur
  const booksOnDoing = await FunctionGetAllOnDoingBooks(id_user);
  const booksDone = await FunctionGetAllDoneBooks(id_user);

  return (
    <div className="flex space-x-4 h-full">
      {/* Passe les données récupérées directement au composant */}
      <TabsBooks id_user={id_user} booksOnDoing={booksOnDoing} booksDone={booksDone} />
    </div>
  );
};

export default Page;
