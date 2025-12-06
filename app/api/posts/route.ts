import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  await connectDB();

  // ⚠️ 아주 허술한 관리자 체크: admin=1 쿠키 있으면 무조건 통과
  const cookie = req.headers.get("cookie") || "";
  const isAdmin = cookie.includes("admin=1");

  if (!isAdmin) {
    return NextResponse.json(
      { error: "관리자만 게시물을 작성할 수 있습니다." },
      { status: 401 }
    );
  }

  const { title, content, category } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "제목과 내용은 필수입니다." },
      { status: 400 }
    );
  }

  const post = await Post.create({
    title,
    content,
    category: category || "일반",
  });

  return NextResponse.json({ post });
}

