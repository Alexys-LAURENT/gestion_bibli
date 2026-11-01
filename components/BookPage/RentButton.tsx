"use client"

import { ToastContext } from "@/contexts/ToastContext";
import { createRent } from "@/utils/Admin Pages/createRent";
import { toggleIsLoan } from "@/utils/toggleIsLoan";
import { Button } from "@nextui-org/button";
import { Session } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";

const RentButton = ({session, is_loan, loan_data, id_book}:{session:Session|null, is_loan:boolean, loan_data:{id_user:number}[], id_book:number}) => {
  const router = useRouter();    
  const {customToast} = useContext(ToastContext)

  const showText = () => {
    if(is_loan){
      if(is_loan && session?.user.id_user && loan_data[0].id_user && loan_data[0].id_user === parseInt(session?.user.id_user)){
        return 'Return the book';
      }else{
        return 'Currently Rented';
      }
    }else{
      return 'Rent';
    }
  }

  const toggleIsRented = async () => {
    if(!session?.user.id_user){
      customToast.error('You need to be logged in to rent a book');
      return redirect('/login');
    }

    if(is_loan && session?.user.id_user && loan_data[0].id_user && loan_data[0].id_user === parseInt(session?.user.id_user)){
      const newLoan = await toggleIsLoan(id_book, parseInt(session?.user.id_user));
      
      if(newLoan.error){
        customToast.error('An error occured');
        return
      }
      customToast.success('Book returned successfully');
      router.refresh();
      return;
    }

    const newLoan = await createRent(id_book, parseInt(session?.user.id_user), new Date().toISOString());

    if(newLoan.error){
      customToast.error('An error occured');
      return 
    }
    customToast.success('Book rented successfully');
    router.refresh();
    return;
  }

  if(session && session.user && session.user.is_admin === true){
    return <div></div>
  }
  
  return (
    <Button
    className="bg-gest_cta text-white disabled:opacity-70"
    onClick={toggleIsRented}
  >
    {showText()}
    </Button>
  );
};

export default RentButton;