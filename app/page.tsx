"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  async function fetchPosts() {
    const params = new URLSearchParams();
    params.set("search", search);
    params.set("category", category);

    const res = await fetch(`/api/posts?${params.toString()}`);
    const data = await res.json();
    setPosts(data.posts || []);
  }

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories || []);
  }

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <>
      {/* 상단바 */}
      <div className="navbar">
        <div className="nav-inner">
          <span className="nav-title">jannerf blog</span>
          <Link href="/" className="nav-link">
            홈으로
          </Link>
        </div>
      </div>

      <div className="wrapper">
        <h1 className="blog-title">jannerf의 블로그</h1>
        <p className="blog-subtitle">개발 · 보안 · 로그 실험 노트</p>

        {/* 검색/필터 UI */}
        <div className="filter-box">
          <input
            className="filter-input"
            placeholder="검색어 입력"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">전체</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button className="filter-button" onClick={fetchPosts}>
            검색
          </button>
        </div>

        {/* 게시물 리스트 */}
        {posts.map((post) => (
          <Link key={post._id} href={`/posts/${post._id}`} className="post-card">
            <h2 className="post-title">{post.title}</h2>

            <p className="post-preview">
              {post.content.length > 80
                ? post.content.slice(0, 80) + "..."
                : post.content}
            </p>

            <div className="post-date">
              {new Date(post.createdAt).toLocaleString()}
            </div>

            <span className="tag">{post.category || "일반"}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

