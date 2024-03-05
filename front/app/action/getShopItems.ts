import prisma from "@/app/lib/prismadb"

async function getShopItems(id: string) {
  try {
    const shop = await prisma.shop.findUnique({
      where: {
        id: id
      },
      include: {
        items: true
      }
    })
    if (!shop?.items) {
      return null
    }
    return shop.items
  } catch {
    return null
  }
}

export default getShopItems