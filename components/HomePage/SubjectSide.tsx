import { Button } from "@nextui-org/button";
import Link from 'next/link';
import { getPopularSubjects } from '@/utils/HomePage/getPopularSubjects';
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default async function SubjectSide() {
    const popularSubjects = await getPopularSubjects(7)
    if(popularSubjects.error){
        return <p>Une erreur est survenue, veuillez réessayer plus tard</p>
    }    

    return (
        <div>
            <p className="text-xs ml-2 mr-2 font-bold text-black mb-2">Popular authors</p>
            {popularSubjects.data && popularSubjects.data.length > 0 && popularSubjects.data.map((subject:{id_subject:number, label:string}) => (
                <Button
                as={Link}
                key={`${subject.id_subject}-`} 
                href={`/discover?subjects=${subject.label}`} 
                className={`w-full justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 `}>
                 <BookOpenIcon className='w-6 h-6' />
                  <span className='font-semibold ml-1'>{subject.label}</span>
                </Button>
            ))}
        </div>
    )
}