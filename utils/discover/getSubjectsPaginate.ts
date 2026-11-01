'use server'; // Marque la fonction pour qu'elle s'exécute côté serveur
import prisma from "@/lib/db"; // Importer l'ORM Prisma

export async function getSubjectsPaginate( label: string, subjectsList: { label:string }[]) {
    
    try {

        // get subjects
        const subjects = await prisma.subjects.findMany({
            take: 10,
            where: {
                label: {
                    contains: label,
                    mode: 'insensitive'
                },
                NOT: {
                    label: {
                        in: subjectsList.map((subject) => subject.label),
                        mode: 'default'
                    }
                }
            },
            select: {
                label: true,
                id_subject: true,
            }
        });

        
        return JSON.parse(JSON.stringify({success: true, data: subjects }))
    } catch (error) {
        console.log(error);
        
        return { error: true, message: "An error occured" };
    }
}
