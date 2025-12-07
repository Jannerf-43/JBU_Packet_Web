"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // --- 인증 검사 ---
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      router.push("/admin/login");
    }
  }, [router]);

  async function handleSubmit() {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, content }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("게시물 생성 완료");
      router.push("/");
    } else {
      alert("오류 발생");
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>게시물 생성 (관리자)</h2>

      <input
        placeholder="제목"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="카테고리"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        placeholder="내용"
        style={{ width: "100%", padding: 10, minHeight: 200 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        style={{
          width: "100%",
          padding: 12,
          background: "#4a80f0",
          color: "white",
          marginTop: 10,
        }}
        onClick={handleSubmit}
      >
        등록
      </button>
    </div>
  );
}

