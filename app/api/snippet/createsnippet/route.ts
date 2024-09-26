import { db } from "@/utils/db";
import { NextResponse } from "next/server";

interface FilesTypes {
    id: number;
    filename: string;
    code: string;
}

export async function POST(req: Request) {
    try {
        const { userid, snippet, snippetFiles } = await req.json();

        if(userid === undefined || snippet === undefined || snippetFiles === undefined) {
            return NextResponse.json({
                message: "Invalid request",
            });
        }

        const createSnippet = await db.snippet.create({
            data: {
                title: snippet.title,
                totalFiles: snippetFiles.length,
                totalLikes: 0,
                uid: userid,
            },
        });

        if(createSnippet) {
            for (let i = 0; i < snippetFiles.length; i++) {
                const currFile: FilesTypes = snippetFiles[i];
                const fileParts = currFile.filename.split('.');

                let language = fileParts.length > 1 ? fileParts[fileParts.length - 1] : "txt";
                if(language === "tsx") language = "typescript";
                if(language === "jsx") language = "javascript";
                
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

                    return NextResponse.json({
                        message: "Failed to create snippet",
                    });
                }
            }

            return NextResponse.json({
                message: "Snippet created successfully",
            });
        }

    } catch(error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal server error",
        });
    }
}
