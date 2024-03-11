import prisma from "@/app/lib/prismadb"

export default async function getIdItem(id: string) {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id
      },
      include: {
        shop: true
      }
    })
    if (!item) {
      return null
    }
    return item
  } catch {
    return null
  }
}