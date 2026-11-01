export type BookType = {
  id_book:number;
  id_author:number;
  title:string;
  year_publication:number;
  first_sentence:string | null;
  image_url:string | null;
  is_loan:boolean;
}

export type BookTypeWithAuthor = {
  id_book:number;
  title:string;
  year_publication:number;
  first_sentence:string | null;
  image_url:string | null;
  is_loan:boolean;
  authors: AuthorType;
}


export type AuthorType = {
  id_author:number;
  name_author:string;
}


// ADMIN RENTS PAGE

export type LoanType={
  id_book:number,
  id_user:number,
 loan_date:string;
 is_return:boolean;
 books:{title:string, image_url:string};
 users:{mail:string,firstname:string,lastname:string};
}