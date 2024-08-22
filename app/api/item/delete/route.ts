import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { Item, Shop } from "@prisma/client";

import { S3 } from "aws-sdk"

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


export async function POST(request: Request) {
  const item: Item & { shop: Shop } = await request.json()
  if (!item.imageURL) {
    return new NextResponse("Missing params id", { status: 400 })
  }
  try {
    const key = item.imageURL.split('/').pop();
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: key!
    }).promise()

    const ret = await prisma.item.delete({
      where: {
        id: item.id
      }
    })
    return NextResponse.json(ret)
  } catch (error) {
    console.error("failed to delete item", error)
    return new NextResponse("internal server error", { status: 500 })
  }
}
