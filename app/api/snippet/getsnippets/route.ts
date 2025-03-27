import { db } from "@/utils/db";
import { NextResponse } from "next/server";

function getFirst10Lines(code: string): string {
    const lines = code.split('\n');
    return lines.slice(0, 10).join('\n');
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(): Promise<NextResponse> {
    try {
        const snippets = await db.snippet.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            select: {
                sid: true,
                title: true,
                public: true,
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
                totalLikes: true,
                createdAt: true
            }
        });
        
        if (!snippets.length) {
            return NextResponse.json({ message: "No snippets found" });
        }

        const processedSnippets = snippets.map(snippet => ({
            ...snippet,
            files: snippet.files.map(file => ({
                ...file,
                code: getFirst10Lines(file.code)
            }))
        }));

        return NextResponse.json(processedSnippets, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch snippets" }, { status: 500 });
    }
}
