import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Cart, CartItem} from '../../shared/models/cart';
import {nanoid} from 'nanoid';
import {Product} from '../../shared/models/product';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  cart = signal<Cart | undefined>(undefined);
  itemsQuantity = computed(()=>this.cart()?.cartItems.reduce((sum, item) => sum + item.quantity, 0));
  totals = computed(()=>{
    const cart = this.cart();
    if (!cart) return null

    const subTotal = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const deliveryFee = 0;

    return {
      subTotal,
      discount,
      deliveryFee,
      total: subTotal - discount + deliveryFee
    }
  });

  getCart(id: string){
    return this.httpClient.get<Cart>(this.apiUrl + `cart/${id}`).pipe(
      map(data=> {
        this.cart.set(data);
        return data;
      })
    )
  }

  setCart(cart: Cart){
    this.httpClient.post<Cart>(this.apiUrl + `cart`, cart).subscribe({
      next: data=> this.cart.set(data)
    })
  }

  deleteCart(key: string){
    this.httpClient.delete(this.apiUrl + `cart/${key}`).subscribe({
      next: ()=>localStorage.removeItem('cart_id'),
      error: ()=>console.log("unable to find the cart with given key")
    })
  }

  addCartItemToCart(product : Product | CartItem, quantity: number){
    const cart = this.cart() ?? this.createCart();

    if(!this.isCartItem(product)){
      product = this.mapProductToCartItem(product, quantity);
    }

    cart.cartItems = this.addOrUpdateCartItem(cart.cartItems, product, quantity);

    this.setCart(cart);
  }

  private createCart() : Cart{
    let cart: Cart = {cartItems: [], id: nanoid()};
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  removeItemFromCart(productId: number, quantity = 1){
    const cart = this.cart();
    if(!cart) return;
    const productIndex = cart.cartItems.findIndex((z)=>z.productId === productId);
    if(productIndex !== -1){
      if(cart.cartItems[productIndex].quantity > quantity)
        cart.cartItems[productIndex].quantity -= 1;
      else
        cart.cartItems.splice(productIndex, 1);
      if(cart.cartItems.length === 0)
        this.deleteCart(cart.id);
      else
        this.setCart(cart);
    }
  }

  private mapProductToCartItem(product: Product, quantity: number) : CartItem{
    return {
      brand: product.brand,
      pictureUrl: product.pictureUrl,
      price: product.price,
      productId: product.id,
      productName: product.name,
      quantity: quantity
    };
  }

  private addOrUpdateCartItem(cartItems: CartItem[], cartItem: CartItem, quantity: number) : CartItem[]{
    let itemIndex = cartItems.findIndex(z=>z.productId == cartItem.productId);
    if(itemIndex === -1){
      cartItems.push(cartItem);
    }else{
      cartItems[itemIndex].quantity += quantity;
    }

    return cartItems;
  }

  private isCartItem(product: Product | CartItem): product is CartItem{
    return (product as CartItem).productId !== undefined;
  }
}
