import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {ProductsService} from '../../../../core/services/products.service';
import {Product} from '../../../../shared/models/product';
import {CurrencyPipe, KeyValuePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatIcon,
    MatFormField,
    MatDivider,
    MatButton,
    MatInput,
    MatLabel,
    KeyValuePipe
  ],
  templateUrl: './product-details.component.html',
  standalone: true,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productsService = inject(ProductsService);

  productId = input<string>();

  product = signal<Product | undefined>(undefined);

  stockMessage = computed(()=> this.product()?.stockQuantity! > 10 ? 'in stock' : 'running out');

  constructor() {
    effect(() => {
      this.loadProducts();
    });
  }

  private loadProducts(){
    if(!this.productId()) return

    this.productsService.getProductById(this.productId()!).subscribe({
      next: data=> this.product.set(data),
      error: err => console.log(err)
    })
  }
}
