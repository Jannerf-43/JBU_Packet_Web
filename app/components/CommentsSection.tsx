"use client";

import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  author?: string;
  content: string;
  createdAt: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  async function loadComments() {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          author: author || "익명",
          content,
        }),
      });

      setContent("");
      await loadComments();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ marginBottom: 12 }}>댓글</h3>

      {/* 댓글 작성 폼 */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <input
          placeholder="닉네임 (선택)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <textarea
          placeholder="댓글 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            minHeight: 80,
          }}
        />
        <button
          type="submit"
          style={{
            alignSelf: "flex-end",
            padding: "6px 12px",
            borderRadius: 4,
            border: "none",
            background: "#555",
            color: "white",
            cursor: "pointer",
          }}
        >
          댓글 작성
        </button>
      </form>

      {/* 댓글 리스트 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {comments.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #eee",
              borderRadius: 6,
              padding: 10,
              background: "#fafafa",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: "0.85rem",
                color: "#777",
              }}
            >
              <span>{c.author || "익명"}</span>
              <span>{new Date(c.createdAt).toLocaleString()}</span>
            </div>

            {/* ⚠️ XSS 취약: dangerouslySetInnerHTML, sanitizing 없음 */}
            <div
              style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

