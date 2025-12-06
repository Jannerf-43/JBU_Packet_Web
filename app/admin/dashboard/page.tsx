"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("일반");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "게시물 생성 실패");
        return;
      }

      setMessage("게시물 생성 완료!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setMessage("에러 발생");
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      {/* 상단바 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
          borderBottom: "1px solid #ddd",
          paddingBottom: 12,
        }}
      >
        <h2>관리자 대시보드</h2>
        <Link href="/" style={{ textDecoration: "none", color: "#0070f3" }}>
          홈으로
        </Link>
      </div>

      <h3 style={{ marginBottom: 16 }}>새 게시물 작성</h3>

      <form
        onSubmit={handleCreatePost}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          placeholder="카테고리 (예: 보안, 개발...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 4,
            border: "1px solid #ccc",
            minHeight: 200,
          }}
        />
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
          게시물 생성
        </button>
      </form>

      {message && (
        <div style={{ marginTop: 12, fontSize: "0.95rem" }}>{message}</div>
      )}
    </div>
  );
}

