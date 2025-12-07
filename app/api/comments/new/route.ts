import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { postId, content } = body;

  const newComment = await prisma.comment.create({
    data: {
      postId: Number(postId),
      content,
    },
  });

  return NextResponse.json({ success: true, comment: newComment });
}

