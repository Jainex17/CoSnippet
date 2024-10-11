import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { snippetId } = await req.json();
        
        if(snippetId === undefined) {
            return NextResponse.error();
        }

        const snippet = await db.snippet.findFirst({
            where: {
                sid: snippetId,
            },
            select: {
                sid: true,
                title: true,
                files: {
                    select: {
                        filename: true,
                        language: true,
                        code: true
                    }
                },
                user: {
                    select: {
                        username: true,
                        picture: true
                    }
                },
                likes: true,
                createdAt: true,
                totalLikes: true
            }
        });

        if(!snippet) {
            return NextResponse.error();
        }

        return NextResponse.json(snippet);

    } catch (error) {
        return NextResponse.error();
    }
}
