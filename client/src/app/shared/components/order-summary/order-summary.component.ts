import {Component, inject} from '@angular/core';
import {CurrencyPipe, Location} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {CartService} from '../../../core/services/cart.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [
    CurrencyPipe,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink
  ],
  templateUrl: './order-summary.component.html',
  standalone: true,
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  protected cartService = inject(CartService);
  protected location = inject(Location);
}
