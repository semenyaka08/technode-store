import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ShopComponent} from './features/shop/shop.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:categoryName', component: ShopComponent },
  { path: 'products', component: ShopComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'},
];
