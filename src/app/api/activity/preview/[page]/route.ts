import { NextResponse } from "next/server";

import prisma from "@/app/api/_db/client";

export async function GET(_: any, { params }: { params: { page: string } }) {
  const page = Number(params.page);

  if (isNaN(page)) {
    return NextResponse.json(null, { status: 400 });
  }

  const pagedPosts = await prisma.post.findMany({
    skip: (page - 1) * 15,
    take: page * 15,

    include: {
      tags: true
    }
  });

  if (!pagedPosts) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(pagedPosts);
}
