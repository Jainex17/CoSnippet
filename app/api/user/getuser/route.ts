import { db } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { username } = await req.json();

        if (!username) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const curruser = await db.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                nickname: true,
                email: true,
                picture: true,
                createdAt: true,
            },
        });

        if (curruser) {
            return NextResponse.json(curruser);
        } else {
            return NextResponse.json({ success: false }, { status: 404 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.error();
    }
}