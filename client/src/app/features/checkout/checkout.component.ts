import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CartItemComponent} from "../cart/cart-item/cart-item.component";
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {StripeService} from '../../core/services/stripe.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {
  ConfirmationToken,
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
import {CartService} from '../../core/services/cart.service';
import {LoginComponent} from '../account/login/login.component';
import {AccountService} from '../../core/services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

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
    JsonPipe,
    MatProgressSpinner
  ],
  templateUrl: './checkout.component.html',
  standalone: true,
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy{
  private stripeService = inject(StripeService);
  private snackbar = inject(SnackbarService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private accountService = inject(AccountService);
  private dialog = inject(MatDialog);
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  confirmationToken?: ConfirmationToken;
  loading = false;
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

  async getConfirmationToken(){
    try {
      if(Object.values(this.completionStatus()).every(status=> status)){
        const result = await this.stripeService.createConfirmationToken();
        if(result.error)
          console.log(result.error.message);

        this.confirmationToken = result.confirmationToken;
        console.log(this.confirmationToken);
      }
    }catch (err: any){
      this.snackbar.error(err.message);
    }

  }

  async confirmPayment(stepper: MatStepper) {
    try {
      this.loading = true;
      if(this.accountService.currentUser()){
        if (this.confirmationToken) {
          const result = await this.stripeService.confirmPayment(this.confirmationToken);
          if (result.error) {
            throw new Error(result.error.message);
          } else {
            this.cartService.deleteCart();
            this.cartService.deliveryMethod.set(undefined);
            await this.router.navigateByUrl('/checkout/success');
          }
        }
      }else{
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '400px'
        });

        dialogRef.afterClosed().subscribe(() => {
          if (this.accountService.currentUser()) {
            this.router.navigate(['/checkout/success']);
          }
        });
      }
    } catch (error: any) {
      this.snackbar.error(error.message || 'Something went wrong');
      stepper.previous();
    }finally {
      this.loading = false;
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
    if($event.selectedIndex === 2)
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());

    if($event.selectedIndex === 3)
      await this.getConfirmationToken();
  }
}
