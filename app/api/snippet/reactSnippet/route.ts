import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid, sid, islike } = await req.json();
    
    if (!uid || !sid || typeof islike !== "boolean") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const alreadyReacted = await db.snippetLike.findFirst({
      where: {
        sid,
        uid,
      },
    });

    if (islike) {
      if (alreadyReacted?.reaction === "LIKE") {
        // remove 1 like
        await db.snippetLike.delete({
          where: {
            lid: alreadyReacted.lid,
          },
        });

        await db.snippet.update({
          where: {
            sid,
          },
          data: {
            totalLikes: {
              decrement: 1,
            },
          },
        });
      } else {
        // Update existing interaction to like
        if (alreadyReacted) {
          await db.snippetLike.update({
            where: { lid: alreadyReacted.lid },
            data: { reaction: "LIKE" },
          });
        } else {
          // Create new like entry
          await db.snippetLike.create({
            data: {
              sid,
              uid,
              reaction: "LIKE",
            },
          });
        }
        // Increment totalLikes
        await db.snippet.update({
            where: { sid },
            data: { totalLikes: { increment: 1 } },
          });
      }
    } else {
      // disliking a snippet
      if (alreadyReacted && alreadyReacted.reaction === "DISLIKE") {
        // Already disliked, so remove the dislike
        await db.snippetLike.delete({
          where: { lid: alreadyReacted.lid },
        });
      } else {
        if (alreadyReacted) {
          // Update existing interaction to dislike
          await db.snippetLike.update({
            where: { lid: alreadyReacted.lid },
            data: { reaction: "DISLIKE" },
          });

          await db.snippet.update({
            where: { sid },
            data: { totalLikes: { decrement: 1 } },
          });

        } else {
          // Create new dislike entry
          const createRection = await db.snippetLike.create({
            data: {
              sid,
              uid,
              reaction: "DISLIKE",
            },
          });
          
          if(!createRection) {
            return NextResponse.json({ success: false }, { status: 500 });
          }

          await db.snippet.update({
            where: { sid },
            data: { totalLikes: { decrement: 1 } },
          });

        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error liking snippet:", error);
    return NextResponse.error();
  }
}
