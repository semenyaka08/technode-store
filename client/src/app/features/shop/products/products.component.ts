import {Component, Input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductCardComponent} from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  standalone: true,
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  @Input() products: Product[] = [];
}
