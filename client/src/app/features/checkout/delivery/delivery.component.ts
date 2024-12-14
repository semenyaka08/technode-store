import {Component, inject, OnInit, output} from '@angular/core';
import {DeliveryMethod} from '../../../shared/models/delivery-method';
import {CheckoutService} from '../../../core/services/checkout.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatLabel} from '@angular/material/form-field';
import {CartService} from '../../../core/services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-delivery',
  imports: [
    MatRadioGroup,
    MatLabel,
    MatRadioButton,
    CurrencyPipe
  ],
  templateUrl: './delivery.component.html',
  standalone: true,
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit{
  private checkoutService = inject(CheckoutService);
  protected cartService = inject(CartService);
  deliveryMethods: DeliveryMethod[] = [];
  isDelivered = output<boolean>();

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: data=> {
        this.deliveryMethods = data;
        if(this.cartService.cart()?.deliveryMethodId){
          const deliveryMethod = data.find(z=> z.id === Number(this.cartService.cart()?.deliveryMethodId));
          if(deliveryMethod){
            this.cartService.deliveryMethod.set(deliveryMethod);
            this.isDelivered.emit(true);
          }

        }
      },
      error: () => console.log("some problems with loading delivery methods")
    });
  }

  onDeliveryUpdate(method: DeliveryMethod){
    this.cartService.deliveryMethod.set(method);
    const cart = this.cartService.cart();
    if(cart){
      cart.deliveryMethodId = method.id.toString();
      this.cartService.setCart(cart);
      this.isDelivered.emit(true);
    }
  }
}
