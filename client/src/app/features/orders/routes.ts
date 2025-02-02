import {OrdersComponent} from './orders.component';
import {authGuard} from '../../core/guards/auth.guard';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {Route} from '@angular/router';

export const orderRoutes: Route[] = [
  { path: '', component: OrdersComponent, canActivate: [authGuard]},
  { path: ':orderId', component: OrderDetailsComponent, canActivate: [authGuard]},
]
