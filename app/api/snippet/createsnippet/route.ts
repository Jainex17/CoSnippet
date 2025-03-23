import { db } from "@/utils/db";
import { NextResponse } from "next/server";

interface FilesTypes {
    id: number;
    filename: string;
    code: string;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function POST(req: Request) {
    try {
        const { username, snippet, snippetFiles } = await req.json();

        if (!username || !snippet || !snippetFiles || snippetFiles.length === 0 || !snippet.title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await db.user.findFirst({
            where: { username },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        try {
            // Use a transaction to ensure both snippet and files are created or nothing is created
            await db.$transaction(async (prisma) => {
                // Create the snippet first
                const createSnippet = await prisma.snippet.create({
                    data: {
                        title: snippet.title,
                        totalFiles: snippetFiles.length,
                        totalLikes: 0,
                        public: snippet.public,
                        uid: user.id,
                    },
                });

                // Create all files
                const filePromises = snippetFiles.map((file: FilesTypes) => {
                    const fileParts = file.filename.split('.');
                    const language = fileParts.length > 1 ? fileParts[fileParts.length - 1] : "txt";

                    return prisma.file.create({
                        data: {
                            filename: file.filename,
                            code: file.code,
                            language,
                            sid: createSnippet.sid,
                        },
                    });
                });

                await Promise.all(filePromises);

                return createSnippet;
            });

            return NextResponse.json({ success: true }, {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Surrogate-Control': 'no-store'
                }
            });

        } catch (transactionError) {
            console.error("Transaction failed:", transactionError);
            return NextResponse.json({ 
                error: "Failed to create snippet and files" 
            }, { status: 500 });
        }

    } catch (error) {
        console.error("Request error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}