import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ShopComponent} from './features/shop/shop.component';
import {ProductDetailsComponent} from './features/shop/products/product-details/product-details.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ServerErrorComponent} from './shared/components/server-error/server-error.component';
import {CartComponent} from './features/cart/cart.component';
import {CheckoutComponent} from './features/checkout/checkout.component';
import {emptyCardGuard} from './core/guards/emptyCard.guard';
import {CheckoutSuccessComponent} from './features/checkout/checkout-success/checkout-success.component';
import {OrdersComponent} from './features/orders/orders.component';
import {OrderDetailsComponent} from './features/orders/order-details/order-details.component';
import {LoginComponent} from './features/account/login/login.component';
import {RegisterComponent} from './features/account/register/register.component';
import {authGuard} from './core/guards/auth.guard';
import {checkoutSuccessGuard} from './core/guards/checkout-success.guard';
import {AdminComponent} from './features/admin/admin.component';
import {adminGuard} from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:categoryName', component: ShopComponent },
  { path: 'products', component: ShopComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [emptyCardGuard, authGuard]},
  { path: 'account/login', component: LoginComponent},
  { path: 'account/register', component: RegisterComponent},
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard]},
  { path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [authGuard]},
  { path: 'checkout/success', component: CheckoutSuccessComponent, canActivate: [authGuard, checkoutSuccessGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [authGuard, adminGuard]},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
