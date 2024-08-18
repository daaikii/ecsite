import { FieldValues } from "react-hook-form"
import { S3 } from "aws-sdk"

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const uploadImageToS3 = async (data: FieldValues, imageURL: string | null) => {
  if (!data.image || !data.image[0]) {
    throw new Error("No image file provided");
  }

  const fileName = `${Date.now()}-${data.image[0].name}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: fileName,
    ContentType: data.image[0].type,
    Body: data.image[0],
  }

  try {
    if (imageURL) {
      const key = imageURL.split('/').pop();
      await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: key!
      }).promise()
    }

    const s3ResponseData = await s3.upload(params).promise()
    const url = s3ResponseData.Location

    return url

  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("failed to upload Image to S3")
  }
}

export default uploadImageToS3