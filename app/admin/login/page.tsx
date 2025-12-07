"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // 취약한 인증 방식 intentionally
    localStorage.setItem("admin", username);

    router.push("/admin/new-post");
  }

  return (
    <div className="wrapper">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>관리자 로그인</h1>

      <form
        onSubmit={handleLogin}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="filter-input"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          placeholder="비밀번호"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="filter-input"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <button className="filter-button" style={{ width: "100%" }}>
          로그인
        </button>
      </form>
    </div>
  );
}

