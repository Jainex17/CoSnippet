import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { snippetId } = await req.json();
        
        if(snippetId === undefined) {
            return NextResponse.error();
        }
        
        const snippet = await db.snippet.findFirst({
            where: { sid: snippetId },
        });
      
        if(!snippet) {
            return NextResponse.error();
        }

        // Delete the snippet
        await db.snippetLike.deleteMany({
            where: { sid: snippet.sid },
        });

        await db.file.deleteMany({
            where: { sid: snippet.sid },
        });

        await db.snippet.delete({
            where: { sid: snippet.sid },
        });

        return NextResponse.json({ success: true });

    }
    catch (error) {
        return NextResponse.error();
    }
}