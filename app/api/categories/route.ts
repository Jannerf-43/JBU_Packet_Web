// app/api/categories/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await connectDB();

  const categories = await Post.distinct("category");

  return NextResponse.json({ categories });
}

