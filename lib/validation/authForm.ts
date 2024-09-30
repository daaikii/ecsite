import { z } from "zod";

import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../constants/constant";


const baseSchema = z.object({// ベースとなるスキーマ
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(8, { message: "パスワードは8文字以上で入力してください" }),
  purpose: z.string().optional(),
  variant: z.string().optional()
});
const registerSchema = baseSchema.extend({// 登録時のみ必要なスキーマ
  name: z.string().min(1, { message: "名前は必須です" }),
});
const shopSchema = registerSchema.extend({// 商用アカウント作成時のみ必要なスキーマ
  address: z.string().min(1, { message: "住所は必須です" }),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    )
    .optional()
    .nullable(),
  // LocationFormのバリデーション例
  lat: z.number({ message: "緯度は必須です" }).min(-90).max(90),
  lng: z.number({ message: "経度は必須です" }).min(-180).max(180),
});



// 動的にスキーマを選択する関数
export const getSchema = (isRegister: boolean, isShop: boolean) => {
  if (isRegister && isShop) {
    return shopSchema;
  } else if (isRegister) {
    return registerSchema;
  } else {
    return baseSchema;
  }
};



export type AuthFormSchema = {
  email: string;
  password: string;
  purpose?: string;
  variant?: string;
  name?: string;
  address?: string;
  image?: File;
  lat?: number;
  lng?: number;
};