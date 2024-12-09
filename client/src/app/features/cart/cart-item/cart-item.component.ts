import {Component, inject, input} from '@angular/core';
import {CartItem} from '../../../shared/models/cart';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [
    MatIcon,
    RouterLink,
    MatButton,
    MatIconButton,
    CurrencyPipe
  ],
  templateUrl: './cart-item.component.html',
  standalone: true,
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);

  decrementProductQuantity(){
    this.cartService.removeItemFromCart(this.item().productId);
  }

  deleteProductFromCart(){
    this.cartService.removeItemFromCart(this.item().productId, this.item().quantity);
  }

  incrementProductQuantity(){
    this.cartService.addCartItemToCart(this.item(), 1);
  }
}
