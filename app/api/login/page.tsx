"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "로그인 실패");
      return;
    }

    // 취약한 인증 방식 – localStorage 사용
    localStorage.setItem("admin", username);

    router.push("/admin/create");
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>관리자 로그인</h2>

      <input
        style={{ width: "100%", marginBottom: 10, padding: 10 }}
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        style={{ width: "100%", marginBottom: 10, padding: 10 }}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        style={{ width: "100%", padding: 12 }}
        onClick={handleLogin}
      >
        로그인
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}

