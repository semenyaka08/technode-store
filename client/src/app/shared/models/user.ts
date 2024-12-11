export interface User{
  firstName: string,
  lastName: string,
  email: string,
  address: Address
}

export interface Address{
  Line1: string,
  Line2?: string,
  City: string,
  State: string,
  PostalCode: string,
  Country: string
}
