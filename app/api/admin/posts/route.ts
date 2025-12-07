import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, content } = body;

    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, message: "필드가 없습니다." },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: { title, category, content },
    });

    return NextResponse.json(
      { success: true, post: newPost },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "서버 오류" },
      { status: 500 }
    );
  }
}

