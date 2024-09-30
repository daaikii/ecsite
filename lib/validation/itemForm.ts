import { z } from "zod"

import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../constants/constant";


export const baseSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }),
  price: z.number().min(1, { message: "値段は必須です" }),
  expirationDate: z.string().min(1, { message: "有効期限は必須です" }),
  stock: z.number().min(1, { message: "在庫数は必須です" }),
  detail: z.string().optional(),
})

export const createSchema = baseSchema.extend({
  image: z
    .instanceof(File)
    .refine((file) => {
      return file.size <= MAX_FILE_SIZE;
    }, {
      message: `ファイルサイズは最大${MAX_FILE_SIZE / (1024 * 1024)}MBです`,
    })
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, {
      message: `サポートされている形式は ${ACCEPTED_IMAGE_TYPES.join(", ")} です`,
    }),
})

export const updateSchema = baseSchema.extend({
  itemId: z.string().optional(),
  imageURL: z.string().optional(),
  image: z
    .instanceof(File)
    .refine((file) => {
      if (!file) return true
      return file.size <= MAX_FILE_SIZE;
    }, {
      message: `ファイルサイズは最大${MAX_FILE_SIZE / (1024 * 1024)}MBです`,
    })
    .refine((file) => {
      if (!file) return true
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, {
      message: `サポートされている形式は ${ACCEPTED_IMAGE_TYPES.join(", ")} です`,
    }).optional()
})

export type ItemFormSchema = {
  name: string
  price: number
  expirationDate: string
  stock: number
  detail?: string
  image?: File
  itemId?: string
  imageURL?: string
}