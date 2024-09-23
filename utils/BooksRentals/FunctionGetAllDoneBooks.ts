// utils/getBooksOnDoing.ts
'use server';
 
import prisma from "@/lib/db";

export async function FunctionGetAllDoneBooks() {
    try {
    const books = await prisma.loan.findMany({
        where: {
            is_return: true ,
        }
    });

    const limitedBooks = books.slice(0, 20);
    
    return JSON.parse(JSON.stringify({ success: true, data: limitedBooks }));

    } catch (error) {
        if (error instanceof Error) {
    return JSON.parse(JSON.stringify({ error: true, message: error.message }));
    }
    }
}
