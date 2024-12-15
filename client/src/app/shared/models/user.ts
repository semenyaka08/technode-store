export interface User{
  firstName: string,
  lastName: string,
  email: string,
  userAddress: Address
}

export interface Address{
  line1: string,
  line2?: string,
  city: string,
  state: string,
  postalCode: string,
  country: string
}
