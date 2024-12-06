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

  addCartItemToCart(product : Product, quantity: number){
    const cart = this.cart() ?? this.createCart();

    const cartItem = this.mapProductToCartItem(product, quantity);

    cart.cartItems = this.addOrUpdateCartItem(cart.cartItems, cartItem);

    this.setCart(cart);
  }

  private createCart() : Cart{
    let cart: Cart = {cartItems: [], id: nanoid()};
    localStorage.setItem('cart_id', cart.id);
    return cart;
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

  private addOrUpdateCartItem(cartItems: CartItem[], cartItem: CartItem) : CartItem[]{
    let itemIndex = cartItems.findIndex(z=>z.productId == cartItem.productId);
    if(itemIndex === -1){
      cartItems.push(cartItem);
    }else{
      cartItems[itemIndex].quantity += cartItem.quantity;
    }

    return cartItems;
  }
}
