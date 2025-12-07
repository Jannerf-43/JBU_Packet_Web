import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.post.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  return NextResponse.json({
    categories: categories.map((c) => c.category),
  });
}

