// components/CommentsSection.tsx
"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadComments() {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ marginTop: "40px" }}>
      <h3 style={{ marginBottom: "12px" }}>댓글</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="작성자 (선택)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "8px",
          }}
        />
        <br />
        <textarea
          placeholder="댓글 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#A3C9A8",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "등록 중..." : "댓글 등록"}
        </button>
      </form>

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            background: "#fafafa",
            borderRadius: "8px",
            padding: "10px 12px",
            marginBottom: "8px",
            border: "1px solid #eee",
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: "#777",
              marginBottom: "4px",
            }}
          >
            {c.author || "익명"} ·{" "}
            {new Date(c.createdAt).toLocaleString()}
          </div>
          <div>{c.content}</div>
        </div>
      ))}

      {comments.length === 0 && <p>첫 댓글을 남겨보세요.</p>}
    </section>
  );
}

