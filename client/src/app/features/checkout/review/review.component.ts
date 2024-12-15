import {Component, inject, input, OnInit} from '@angular/core';
import {CartItem} from '../../../shared/models/cart';
import {CartService} from '../../../core/services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {ConfirmationToken} from '@stripe/stripe-js';
import {AddressPipe} from '../../../shared/pipes/address.pipe';
import {PaymentCardPipe} from '../../../shared/pipes/payment-card.pipe';

@Component({
  selector: 'app-review',
  imports: [
    CurrencyPipe,
    AddressPipe,
    PaymentCardPipe
  ],
  templateUrl: './review.component.html',
  standalone: true,
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit{
  productItems?: CartItem[];
  cartService = inject(CartService);

  confirmationToken = input<ConfirmationToken>();

  ngOnInit() {
    this.productItems = this.cartService.cart()?.cartItems;
  }
}
