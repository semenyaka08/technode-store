import {Component, inject, OnInit, signal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {OrderService} from '../../../core/services/order.service';
import {Order} from '../../../shared/models/order';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {PaymentCardPipe} from '../../../shared/pipes/payment-card.pipe';
import {AddressPipe} from '../../../shared/pipes/address.pipe';

@Component({
  selector: 'app-order-details',
  imports: [
    MatCard,
    RouterLink,
    MatButton,
    CurrencyPipe,
    DatePipe,
    PaymentCardPipe,
    AddressPipe
  ],
  templateUrl: './order-details.component.html',
  standalone: true,
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute);
  ordersService = inject(OrderService);
  order = signal<Order | undefined>(undefined);

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder(){
    const orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    if(!orderId)
      return;
    this.ordersService.getOrderById(+orderId).subscribe({
      next: data=> this.order.set(data),
      error: ()=> console.error("Problems with loading order data")
    })
  }

}
