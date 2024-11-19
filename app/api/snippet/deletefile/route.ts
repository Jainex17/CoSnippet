import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { snippetId, fid } = await req.json();
        
        if(snippetId === undefined || fid === undefined) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        
        const snippet = await db.snippet.findFirst({
            where: { sid: snippetId },
        });
        
        if(!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }
        
        if(snippet?.totalFiles <= 1) {
            return NextResponse.json({ error: "Snippet must have at least one file" }, { status: 400 });
        }
        
        // Delete the snippet
        await db.file.delete({
            where: { sid: snippet.sid, fid: fid },
        });

        return NextResponse.json({ success: true });
    }
    catch (error) {
        return NextResponse.error();
    }
}