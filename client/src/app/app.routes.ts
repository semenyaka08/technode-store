import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ShopComponent} from './features/shop/shop.component';
import {ProductDetailsComponent} from './features/shop/products/product-details/product-details.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ServerErrorComponent} from './shared/components/server-error/server-error.component';
import {CartComponent} from './features/cart/cart.component';
import {CheckoutComponent} from './features/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:categoryName', component: ShopComponent },
  { path: 'products', component: ShopComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
