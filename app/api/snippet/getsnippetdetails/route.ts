import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { snippetId, username } = await req.json();
        
        if(snippetId === undefined || username === undefined) {
            return NextResponse.json({ success: false }, { status: 400 });
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
                        fid: true,
                        filename: true,
                        language: true,
                        code: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        picture: true
                    }
                },
                likes: true,
                createdAt: true,
                totalFiles: true,
                totalLikes: true,
                public: true
            }
        });

        if(!snippet) {
            return NextResponse.json({ success: false }, { status: 404 });
        }

        if(snippet.user.username !== username) {
            return NextResponse.json({ success: false }, { status: 403 });
        }

        return NextResponse.json(snippet);

    } catch (error) {
        return NextResponse.error();
    }
}
