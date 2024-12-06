export interface Cart{
  id: string,
  cartItems: CartItem[]
}

export interface CartItem{
  productId: number,
  productName: string,
  price: number,
  quantity: number,
  pictureUrl: string,
  brand: string
}
