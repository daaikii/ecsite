export interface ItemDTO {
  id: string,
  name: string,
  price: number,
  expirationDate: string,
  stock: number,
  detail: string | null,
  imageURL: string,
  shop?: Partial<ShopDTO>
}

export interface ShopDTO {
  id: string,
  name: string,
  imageURL: string,
  address: string,
  latitude: number,
  longitude: number,
  items: ItemDTO[]
}



export interface UserDTO {
  id: string,
  name: string,
}