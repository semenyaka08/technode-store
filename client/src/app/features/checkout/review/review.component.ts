import {Component, inject, OnInit} from '@angular/core';
import {CartItem} from '../../../shared/models/cart';
import {CartService} from '../../../core/services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-review',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './review.component.html',
  standalone: true,
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit{
  productItems?: CartItem[];
  cartService = inject(CartService);

  ngOnInit() {
    this.productItems = this.cartService.cart()?.cartItems;
  }
}
