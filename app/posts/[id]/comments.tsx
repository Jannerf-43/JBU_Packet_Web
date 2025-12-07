"use client";

import { useEffect, useState } from "react";

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  async function loadComments() {
    const res = await fetch(`/api/comments/${postId}`);
    const data = await res.json();
    setComments(data.comments || []);
  }

  async function submitComment() {
    if (!text.trim()) return;

    await fetch("/api/comments/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, content: text }),
    });

    setText("");
    loadComments();
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ marginBottom: "12px" }}>댓글</h2>

      {/* 댓글 작성 */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글 작성"
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          onClick={submitComment}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            background: "black",
            color: "white",
          }}
        >
          등록
        </button>
      </div>

      {/* 댓글 목록 */}
      {comments.length === 0 && <p>댓글이 없습니다.</p>}

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
            marginBottom: "8px",
          }}
        >
          <div style={{ color: "#666", fontSize: "14px" }}>
            {new Date(c.createdAt).toLocaleString()}
          </div>
          <div style={{ marginTop: "6px" }}>{c.content}</div>
        </div>
      ))}
    </div>
  );
}

