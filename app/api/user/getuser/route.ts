import { db } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({
                message: 'Email is required',
            });
        }

        const curruser = await db.user.findUnique({
            where: { email },
        });

        if (curruser) {
            return NextResponse.json({
                id: curruser.id,
                email,
                username: curruser.name,
                picture: curruser.picture,
            });
        } else {
            return NextResponse.json({
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({
            message: 'Internal server error',
        });
    }
}