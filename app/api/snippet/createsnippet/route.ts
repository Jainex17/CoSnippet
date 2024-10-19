import { db } from "@/utils/db";
import { NextResponse } from "next/server";

interface FilesTypes {
    id: number;
    filename: string;
    code: string;
}

export async function POST(req: Request) {
    try {
        const { username, snippet, snippetFiles } = await req.json();
        
        if(username === undefined || snippet === undefined || snippetFiles === undefined) {
            return NextResponse.error();
        }

        const user = await db.user.findFirst({
            where: {
                username,
            },
        });

        if(!user) {
            return NextResponse.error();
        }

        const createSnippet = await db.snippet.create({
            data: {
                title: snippet.title,
                totalFiles: snippetFiles.length,
                totalLikes: 0,
                uid: user.id,
            },
        });

        if(createSnippet) {
            for (let i = 0; i < snippetFiles.length; i++) {
                const currFile: FilesTypes = snippetFiles[i];
                const fileParts = currFile.filename.split('.');

                const language = fileParts.length > 1 ? fileParts[fileParts.length - 1] : "txt";
                
                const createfile = await db.file.create({
                    data: {
                        filename: currFile.filename,
                        code: currFile.code,
                        sid: createSnippet.sid,
                        language,
                    },
                });
                
                if(!createfile) {

                    await db.snippet.delete({
                        where: {
                            sid: createSnippet.sid,
                        },
                    });

                    return NextResponse.error();
                }
            }

            return NextResponse.json({
                message: "Snippet created successfully",
            });
        }

    } catch(error) {
        console.error(error);
        return NextResponse.error();
    }
}
