import { ItemDTO } from "../types/data";
import { s3 } from "./s3"

export default async function deleteImageS3(item: ItemDTO) {
  if (!item.imageURL) {
    return new Error("商品画像が見つかりません")
  }
  const key = item.imageURL.split('/').pop();
  const res = await s3.deleteObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: key!
  }).promise()
}