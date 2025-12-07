import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";

    const posts = await prisma.post.findMany({
      where: {
        AND: [
          category !== "all" ? { category } : {},
          search ? { title: { contains: search } } : {},
        ],
      },
      orderBy: { id: "desc" },
    });

    // 🔥 배열만 리턴! 가장 중요한 줄
    return NextResponse.json(posts);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

