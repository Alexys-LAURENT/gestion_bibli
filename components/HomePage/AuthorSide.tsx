import { getPopularAuthors } from "@/utils/HomePage/getPopularAuthors";
import { Button } from "@nextui-org/button";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function AuthorSide() {
    const popularAuthors = await getPopularAuthors(7)
    if(popularAuthors.error){
        return <p>Une erreur est survenue, veuillez réessayer plus tard</p>
    }    

    return (
        <div>
            <p className="text-xs ml-2 mr-2 font-bold text-black mb-2">Popular authors</p>
            {popularAuthors.data && popularAuthors.data.length > 0 && popularAuthors.data.map((author:{id_author:number, name_author:string}) => (
                <Button
                as={Link}
                key={`${author.id_author}-`} 
                href={`/discover?authors=${author.name_author}`} 
                className={`w-full justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 `}>
                  <UserCircleIcon className='w-6 h-6' />
                  <span className='font-semibold ml-1'>{author.name_author}</span>
                </Button>
            ))}
        </div>
    )
}