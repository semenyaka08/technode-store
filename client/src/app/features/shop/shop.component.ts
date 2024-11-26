import {Component, inject, OnInit} from '@angular/core';
import {ShopService} from '../../core/services/shop.service';
import {Product} from '../../shared/models/product';
import {MatCard, MatCardImage, MatCardTitle} from '@angular/material/card';
import {ProductItemComponent} from './product-item/product-item.component';
import {FilterComponent} from './filters-section/filter/filter.component';

@Component({
  selector: 'app-shop',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardImage,
    ProductItemComponent,
    FilterComponent
  ],
  templateUrl: './shop.component.html',
  standalone: true,
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  products: Product[] = [];
  types: string[] = [];
  brands: string[] = [];

  ngOnInit() {
    this.shopService.getPage().subscribe({
      next: data => {
        this.products = data.items;

        this.types = [...new Set(this.products.map(product => product.type))];

        this.brands = [...new Set(this.products.map(product => product.brand))];
      },
      error: err => console.error(err)
    })
  }
}
