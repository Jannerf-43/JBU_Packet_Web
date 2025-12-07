"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  // -------------------------------
  //  카테고리 불러오기
  // -------------------------------
  async function loadCategories() {
    try {
      const res = await fetch("/api/categories", {
        cache: "no-store",
      });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error(e);
    }
  }

  // -------------------------------
  //  게시물 불러오기
  // -------------------------------
  async function loadPosts(opts?: { useSearch?: boolean }) {
    const useSearch = opts?.useSearch ?? false;

    const params = new URLSearchParams();
    if (useSearch && search) params.set("search", search);
    if (category) params.set("category", category);

    setLoading(true);
    try {
      const res = await fetch(`/api/posts?${params.toString()}`, {
        cache: "no-store",
      });

      const data = await res.json();

      // 🔥 중요한 부분: data.posts가 아니라 API는 "배열 그대로" 반환함
      setPosts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // 최초 로드
  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  // 카테고리 변경 시 자동 갱신
  useEffect(() => {
    loadPosts({ useSearch: true });
  }, [category]);

  return (
    <div className="wrapper">
      {/* 상단바 */}
      <header style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#333" }}>
          <h1 className="blog-title">jannerf의 블로그</h1>
        </Link>
        <p className="blog-subtitle">패킷 분석 · IDS 실습용 취약 블로그</p>
      </header>

      {/* 검색 / 카테고리 */}
      <div className="filter-box">
        <input
          className="filter-input"
          placeholder="제목 검색"
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

        <button
          className="filter-button"
          onClick={() => loadPosts({ useSearch: true })}
        >
          검색
        </button>
      </div>

      {/* 로딩 */}
      {loading && <p>불러오는 중...</p>}

      {/* 게시물 카드 */}
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="post-card"
        >
          <div className="post-date">
            {new Date(post.createdAt).toLocaleString()}
          </div>

          <h2 className="post-title">{post.title}</h2>
          <p className="post-preview">{post.content}</p>
          <span className="tag">{post.category}</span>
        </Link>
      ))}

      {!loading && posts.length === 0 && (
        <p style={{ marginTop: "1rem" }}>게시물이 없습니다.</p>
      )}
    </div>
{/* 
  TODO: 개발환경 제거 예정
  내부 테스트 서버(로컬): http://192.168.205.128:3000
  NOTE: API 디버깅용 엔드포인트 /api/debug
*/}

  );
}

