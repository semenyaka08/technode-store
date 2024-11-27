export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  brand: string;
  stockQuantity: number;
  categoryName: string;
  specifications: {
    [key: string]: string;
  };
}
