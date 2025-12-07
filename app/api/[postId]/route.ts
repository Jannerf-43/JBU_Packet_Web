import { prisma } from "@/lib/prisma";
import CommentSection from "./comments";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostDetail({ params }: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return <div style={{ padding: "24px" }}>존재하지 않는 게시물입니다.</div>;
  }

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>{post.title}</h1>

      <div style={{ color: "#555", marginBottom: "12px" }}>
        카테고리: {post.category} ·{" "}
        {new Date(post.createdAt).toLocaleString()}
      </div>

      <p style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.6" }}>
        {post.content}
      </p>

      {/* 댓글 섹션 */}
      <CommentSection postId={Number(id)} />
    </div>
  );
}

