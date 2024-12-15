export interface Cart{
  id: string,
  cartItems: CartItem[],
  deliveryMethodId?: string,
  clientSecret?: string,
  paymentIntentId?: string
}

export interface CartItem{
  productId: number,
  productName: string,
  price: number,
  quantity: number,
  pictureUrl: string,
  brand: string
}
