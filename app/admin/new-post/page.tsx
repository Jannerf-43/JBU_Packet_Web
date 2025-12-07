"use client";

import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, content }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("게시물 생성 실패");
      return;
    }

    alert("게시물 생성 완료!");
    window.location.href = "/";
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>새 게시물 작성</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
        />

        <input
          placeholder="카테고리"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", height: "200px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "12px",
            background: "black",
            color: "white",
          }}
        >
          작성하기
        </button>
      </form>
    </div>
  );
}

