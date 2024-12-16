export interface Order {
  id: number
  orderCreated: string
  orderStatus: number
  buyerEmail: string
  paymentSummary: PaymentSummary
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  deliveryMethodId: number
  subtotal: number
  paymentIntendId: string
}

export interface PaymentSummary {
  last4: number
  brand: string
  expMonth: number
  year: number
}

export interface OrderItem {
  productId: number
  productName: string
  pictureUrl: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  name: string
  line1: string
  line2: string | null
  city: string
  state: string
  postalCode: string
  country: string
}

export interface OrderToCreate{
  cartId: string,
  deliveryMethodId: number,
  paymentSummary: PaymentSummary,
  shippingAddress: ShippingAddress
}
