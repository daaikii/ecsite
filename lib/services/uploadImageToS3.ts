import { s3 } from "./s3"


//第二引数にurlを渡した場合、そのurlのimageを更新する。
const uploadImageToS3 = async (image: File, imageURL?: string | null) => {
  if (!image) {
    throw new Error("No image file provided");
  }
  try {
    let s3ResponseData;
    if (imageURL) {
      const key = imageURL.split('/').pop();
      s3ResponseData = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: key!,
        ContentType: image.type,
        Body: Buffer.from(await image.arrayBuffer())
      }).promise()
    } else {
      const fileName = `${Date.now()}-${image.name}`;
      s3ResponseData = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: fileName,
        ContentType: image.type,
        Body: Buffer.from(await image.arrayBuffer())
      }).promise()
    }
    if (!s3ResponseData) {
      throw new Error("response not found")
    }
    const url = s3ResponseData.Location

    return url

  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("failed to upload Image to S3")
  }
}

export default uploadImageToS3