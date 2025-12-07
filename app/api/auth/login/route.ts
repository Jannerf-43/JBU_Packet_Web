import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return NextResponse.json({ success: false, message: "존재하지 않는 계정" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return NextResponse.json({ success: false, message: "비밀번호 불일치" }, { status: 401 });
  }

  // 세션 저장 (Next.js 쿠키 사용)
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin", admin.username, { httpOnly: true });

  return res;
}

