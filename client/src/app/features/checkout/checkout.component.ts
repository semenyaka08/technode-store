import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CartItemComponent} from "../cart/cart-item/cart-item.component";
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {StripeService} from '../../core/services/stripe.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {
  StripeAddressElement,
  StripeAddressElementChangeEvent,
  StripePaymentElement,
  StripePaymentElementChangeEvent
} from '@stripe/stripe-js';
import {firstValueFrom} from 'rxjs';
import {DeliveryComponent} from './delivery/delivery.component';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {ReviewComponent} from './review/review.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [
    CartItemComponent,
    OrderSummaryComponent,
    MatStepper,
    MatStep,
    MatButton,
    RouterLink,
    MatStepperNext,
    DeliveryComponent,
    MatStepperPrevious,
    ReviewComponent,
    JsonPipe
  ],
  templateUrl: './checkout.component.html',
  standalone: true,
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy{
  private stripeService = inject(StripeService);
  private snackbar = inject(SnackbarService);
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  completionStatus = signal<{address: boolean, deliveryMethod: boolean, payment: boolean}>({
    address: false,
    deliveryMethod: false,
    payment: false
  });

  async ngOnInit(){
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element');
      this.addressElement.on('change', this.onAddressStatusChange);

      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount('#payment-element');
      this.paymentElement.on('change', this.onPaymentStatusChange);
    }catch (error:any){
      this.snackbar.error(error.message);
    }
  }

  onPaymentStatusChange = (event: StripePaymentElementChangeEvent) =>{
    this.completionStatus.update(state=>{
      state.payment = event.complete;
      return state;
    })
  }

  onAddressStatusChange = (event: StripeAddressElementChangeEvent) => {
    this.completionStatus.update(state=>{
      state.address = event.complete;
      return state;
    })
  }

  onDeliveryStatusChange = (event: boolean) => {
    this.completionStatus.update(state=>{
      state.deliveryMethod = event;
      return state;
    })
  }

  ngOnDestroy() {
    this.stripeService.addressElement = undefined;
    this.stripeService.elements = undefined;
  }

  async onStepChange($event: StepperSelectionEvent) {
    if($event.selectedIndex == 2)
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
  }
}
