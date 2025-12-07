import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, context: any) {
  // Next.js 14에서 context.params가 Promise로 전달됨 → await 필요
  const { postId } = await context.params;

  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
    orderBy: { id: "desc" },
  });

  return NextResponse.json({ comments });
}

