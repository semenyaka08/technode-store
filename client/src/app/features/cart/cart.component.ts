import {Component, inject} from '@angular/core';
import {CartService} from '../../core/services/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';
import {OrderSummaryComponent} from '../../shared/components/order-summary/order-summary.component';
import {EmptyCartComponent} from './empty-cart/empty-cart.component';

@Component({
  selector: 'app-cart',
  imports: [
    CartItemComponent,
    OrderSummaryComponent,
    EmptyCartComponent
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
}
