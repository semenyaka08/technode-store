import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ServerErrorComponent} from './shared/components/server-error/server-error.component';
import {emptyCardGuard} from './core/guards/emptyCard.guard';
import {authGuard} from './core/guards/auth.guard';
import {checkoutSuccessGuard} from './core/guards/checkout-success.guard';
import {adminGuard} from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:categoryName', loadComponent: () => import('./features/shop/shop.component').then(z=>z.ShopComponent) },
  { path: 'products', loadChildren: () => import("./features/shop/products/routes").then(z=> z.productRoutes)},
  { path: 'cart', loadComponent: ()=> import('./features/cart/cart.component').then(z=>z.CartComponent)},
  { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then(z=>z.CheckoutComponent), canActivate: [emptyCardGuard, authGuard]},
  { path: 'account', loadChildren: () => import("./features/account/routes").then(z=> z.accountRoutes)},
  { path: 'orders', loadChildren: () => import("./features/orders/routes").then(z=> z.orderRoutes)},
  { path: 'checkout/success', loadComponent: () => import('./features/checkout/checkout-success/checkout-success.component')
      .then(z=>z.CheckoutSuccessComponent), canActivate: [authGuard, checkoutSuccessGuard]},
  { path: 'admin', loadComponent: () => import('./features/admin/admin.component')
      .then(z=>z.AdminComponent), canActivate: [authGuard, adminGuard]},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
