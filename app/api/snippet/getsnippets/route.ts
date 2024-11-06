import { db } from "@/utils/db";
import { NextResponse } from "next/server";

function getFirst10Lines(code: string): string {
    const lines = code.split('\n');
    return lines.slice(0, 20).join('\n');
}

export async function GET(): Promise<NextResponse> {
    try {
        const snippets = await db.snippet.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                public: true
            },
            take: 10,
            select: {
                sid: true,
                title: true,
                files: {
                    take: 1,    
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
        
        const processedSnippets = snippets.map(snippet => ({
            ...snippet,
            files: snippet.files.map(file => ({
                ...file,
                code: getFirst10Lines(file.code) 
            }))
        }));

        return NextResponse.json(processedSnippets);
    } catch (error) {
        console.error("Error fetching snippets:", error);
        return NextResponse.json({ error: "Failed to fetch snippets" }, { status: 500 });
    }
}
