import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "username과 password가 필요합니다." },
      { status: 400 }
    );
  }

  // ⚠️ 비밀번호 해시 X, NoSQL Injection 방어 X
  let user = await User.findOne({ username, password });

  // ⚠️ 유저 없으면 그냥 새로 만들어버림 → 누구나 관리자 계정 생성 가능
  if (!user) {
    user = await User.create({ username, password });
  }

  const res = NextResponse.json({ ok: true, message: "로그인 성공" });

  // ⚠️ HttpOnly, Secure, 만료시간, 서명 전혀 없음 → 아무나 쿠키 위조 가능
  res.headers.append("Set-Cookie", `admin=1; Path=/;`);

  return res;
}

