import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "postId가 필요합니다." },
      { status: 400 }
    );
  }

  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
  return NextResponse.json({ comments });
}

export async function POST(req: Request) {
  await connectDB();
  const { postId, author, content } = await req.json();

  if (!postId || !content) {
    return NextResponse.json(
      { error: "postId와 content는 필수입니다." },
      { status: 400 }
    );
  }

  // ⚠️ content 검증 없음 → XSS 가능
  const comment = await Comment.create({
    postId,
    author: author || "익명",
    content,
  });

  return NextResponse.json({ comment });
}

