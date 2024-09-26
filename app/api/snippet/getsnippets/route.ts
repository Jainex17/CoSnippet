import { db } from "@/utils/db";
import { NextResponse } from "next/server";

function getFirst10Lines(code: string): string {
    const lines = code.split('\n');
    return lines.slice(0, 20).join('\n');
}

export async function GET(): Promise<NextResponse> {
    try {
        const snippets = await db.snippet.findMany({
            select: {
                title: true,
                file: {
                    take: 1,
                    select: {
                        filename: true,
                        language: true,
                        code: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        picture: true
                    }
                },
                createdAt: true,
                totalLikes: true
            }
        });

        const processedSnippets = snippets.map(snippet => ({
            ...snippet,
            file: snippet.file.map(file => ({
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
