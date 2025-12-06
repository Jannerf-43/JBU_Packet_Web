"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
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

      // 로그인 성공 후 관리자 대시보드로 이동
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("에러 발생");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>관리자 로그인</h1>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 20,
        }}
      >
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        {error && (
          <div style={{ color: "red", fontSize: "0.9rem" }}>{error}</div>
        )}
        <button
          type="submit"
          style={{
            padding: 10,
            borderRadius: 4,
            border: "none",
            background: "#333",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}

