import { NextResponse } from "next/server";

import prisma from "../../_db/client";

export async function GET(_: any, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(null, { status: 400 });
  }
  
  const post = await prisma.post.findUnique({
    where: { postId: Number(id) },
    include: {
      tags: true,
    },
  });
  
  if (!post) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(post);
}
