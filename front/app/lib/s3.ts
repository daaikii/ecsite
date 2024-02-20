import { FieldValues } from "react-hook-form"
import { S3 } from "aws-sdk"

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
})

const uploadImageToS3 = async (data: FieldValues) => {
  const fileName = `${Date.now()}-${data.image[0].name}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
    Key: fileName,
    ContentType: data.image[0].type,
    Body: data.image[0],
  }
  try {
    const s3ResponseData = await s3.upload(params).promise()
    const imageURL = s3ResponseData.Location
    return imageURL
  } catch (error) {
    console.log(error)
    throw new Error("failed to upload Image to S3")
  }
}

export default uploadImageToS3