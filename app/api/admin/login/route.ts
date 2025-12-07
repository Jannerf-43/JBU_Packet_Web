import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "아이디와 비밀번호를 입력하세요." }, { status: 400 });
  }

  const user = await prisma.admin.findUnique({
    where: { username },
  });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "아이디 또는 비밀번호가 잘못되었습니다." }, { status: 401 });
  }

  // 취약한 세션: localStorage에서 보관하도록 front에게 전달
  return NextResponse.json({ ok: true, username });
}

