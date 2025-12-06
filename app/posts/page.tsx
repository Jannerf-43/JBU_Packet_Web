import Link from "next/link";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: "no-cache" });
  const data = await res.json();
  return data.posts;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h1 style={{ fontSize: "2.4rem", fontWeight: "800", marginBottom: "2rem" }}>
        📝 jannerf 블로그
      </h1>

      {posts.map((post: any) => (
        <Link
          key={post._id}
          href={`/posts/${post._id}`}
          style={{
            display: "block",
            padding: "20px",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{post.title}</h2>
          <p style={{ color: "#555" }}>
            {post.content.slice(0, 60)}...
          </p>

          <span style={{ fontSize: "0.9rem", color: "#888" }}>
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </Link>
      ))}
    </div>
  );
}

