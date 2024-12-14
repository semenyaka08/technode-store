import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CartItemComponent} from "../cart/cart-item/cart-item.component";
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {StripeService} from '../../core/services/stripe.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {StripeAddressElement, StripePaymentElement} from '@stripe/stripe-js';
import {firstValueFrom} from 'rxjs';
import {DeliveryComponent} from './delivery/delivery.component';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

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
    MatStepperPrevious
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

  async ngOnInit(){
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element');
      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount('#payment-element');
    }catch (error:any){
      this.snackbar.error(error.message);
    }
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
