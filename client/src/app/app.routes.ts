import { Routes } from '@angular/router';
import {ShopComponent} from './features/shop/shop.component';
import {CategoryProductsComponent} from './features/category-products/category-products.component';

export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'products/:category', component: CategoryProductsComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
