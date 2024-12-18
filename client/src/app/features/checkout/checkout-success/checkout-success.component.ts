import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {SignalrService} from '../../../core/services/signalr.service';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {PaymentCardPipe} from '../../../shared/pipes/payment-card.pipe';
import {AddressPipe} from '../../../shared/pipes/address.pipe';
import {Order} from '../../../shared/models/order';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {OrderService} from '../../../core/services/order.service';

@Component({
  selector: 'app-checkout-success',
  imports: [
    RouterLink,
    MatButton,
    DatePipe,
    PaymentCardPipe,
    AddressPipe,
    CurrencyPipe,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './checkout-success.component.html',
  standalone: true,
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent implements OnDestroy{
  signalrService = inject(SignalrService);
  orderService = inject(OrderService);

  ngOnDestroy() {
    this.orderService.orderComplete = false;
    this.signalrService.orderSignal.set(undefined);
  }
}
