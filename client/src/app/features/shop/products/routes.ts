import {Route} from '@angular/router';
import {ShopComponent} from '../shop.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

export const productRoutes: Route[] = [
  { path: '', component: ShopComponent },
  { path: ':productId', component: ProductDetailsComponent },
]
