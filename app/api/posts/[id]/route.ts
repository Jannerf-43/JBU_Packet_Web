export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);   // 🔥 string → number 변환

  const post = await prisma.post.findUnique({
    where: { id },                // 🔥 이제 number 타입이라 오류 없음
    include: {
      comments: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return Response.json(post);
}

