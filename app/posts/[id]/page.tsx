import CommentsSection from "@/components/CommentsSection";

interface Props {
  params: Promise<{ id: string }>;
}

async function getPost(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/posts/${id}`, { cache: "no-cache" });
  if (!res.ok) return null;
  return (await res.json()).post;
}

export default async function PostDetail(props: Props) {
  const { id } = await props.params;
  const post = await getPost(id);

  if (!post) {
    return <div className="wrapper">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div className="navbar">
        <div className="nav-inner">
          <span className="nav-title">jannerf blog</span>
          <a href="/" className="nav-link">홈으로</a>
        </div>
      </div>

      <div className="detail-wrapper">
        <div className="detail-card">
          <div className="detail-info">
            {new Date(post.createdAt).toLocaleString()}
            <span className="tag">{post.category || "일반"}</span>
          </div>

          <h1 className="detail-title">{post.title}</h1>

          <div className="detail-content">{post.content}</div>

          <CommentsSection postId={post._id} />
        </div>
      </div>
    </>
  );
}

