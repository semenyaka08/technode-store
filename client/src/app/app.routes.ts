import { Routes } from '@angular/router';
import {ShopComponent} from './features/shop/shop.component';
import {CategoriesComponent} from './features/shop/categories/categories.component';

export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'products:category', component: CategoriesComponent },
];
