import TabsBooks from "@/components/BooksRentals/TabsBooks";
import { FunctionGetAllOnDoingBooks } from "@/utils/BooksRentals/FunctionGetAllOnDoingBooks";
import { FunctionGetAllDoneBooks } from "@/utils/BooksRentals/FunctionGetAllDoneBooks";
import { auth } from "@/utils/auth"; 
import { redirect } from "next/navigation";

const Page = async () => {
  // Fonction d'authentification pour obtenir la session utilisateur
  const session = await auth();

  // Vérifie si la session ou l'utilisateur est présent
  if (!session || !session.user || !session.user.id_user) {
    return redirect('/login');
  }

  const id_user = session.user.id_user;

  // Fonctions pour récupérer les données du côté serveur
  const {data:booksOnDoing} = await FunctionGetAllOnDoingBooks(Number(id_user));
  
  
  const {data:booksDone} = await FunctionGetAllDoneBooks(Number(id_user));

  return (
    <div className="flex space-x-4 h-full">
      {/* Passe les données récupérées directement au composant */}
      <TabsBooks booksOnDoing={booksOnDoing || []} booksDone={booksDone || []} />
    </div>
  );
};

export default Page;
