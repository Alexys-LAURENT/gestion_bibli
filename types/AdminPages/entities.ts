export type BookType = {
  id_book:number;
  id_author:number;
  title:string;
  year_publication:number;
  first_sentence:string | null;
  image_url:string | null;
  is_loan:boolean;
}

export type AuthorType = {
  id_author:number;
  name_author:string;
}