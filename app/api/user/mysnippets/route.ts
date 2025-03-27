import { db } from "@/utils/db";
import { NextResponse } from "next/server";

function getFirst10Lines(code: string): string {
    const lines = code.split('\n');
    return lines.slice(0, 20).join('\n');
}

export async function POST(req: Request) {
    try {
        const { username } = await req.json();

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const snippets = await db.snippet.findMany({
            where: { user: { username }, public: true },
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
    } catch (error: any) {
        console.error("Error fetching snippets:", error);
        
        // Handle database connection errors specifically
        if (error.code === 'P1001') {
            return NextResponse.json(
                { error: "Database connection failed. Please try again later." },
                { status: 503 }
            );
        }
        
        // Handle other errors
        return NextResponse.json(
            { error: "Failed to fetch snippets" },
            { status: 500 }
        );
    }
}
