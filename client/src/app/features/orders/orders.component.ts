import {Component, inject, OnInit, signal} from '@angular/core';
import {OrderService} from '../../core/services/order.service';
import {Order} from '../../shared/models/order';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatTable} from '@angular/material/table';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    MatButton,
    RouterLink,
    MatTable,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
    ordersService = inject(OrderService);
    orders = signal<Order[] | undefined>(undefined);

    ngOnInit(): void {
        this.ordersService.getOrdersForSpecificUser().subscribe({
          next: data=> this.orders.set(data),
          error: () => console.log("Problem with loading orders")
        })
    }
}
