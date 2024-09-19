// utils/getBooksOnDoing.ts
'use server';
 
import prisma from "@/lib/db";

export async function FunctionGetAllOnDoingBooks() {
    try {
    const books = await prisma.book.findMany({
        where: {
            is_return: 'false',
        }
        

    })
    .slice (0,20);
    
    return JSON.parse(JSON.stringify({ success: true, data: books }));

    } catch (error) {
        if (error instanceof Error) {
    return JSON.parse(JSON.stringify({ error: true, message: error.message }));
    }
    }
}
