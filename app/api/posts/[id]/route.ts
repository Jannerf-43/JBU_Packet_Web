import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await props.params;   // ⭐ 반드시 await
    console.log("API PARAM ID =", id);

    const post = await Post.findById(id);

    if (!post) {
      console.log("Post not found for ID:", id);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (err: any) {
    console.error("Error in GET /api/posts/[id]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

