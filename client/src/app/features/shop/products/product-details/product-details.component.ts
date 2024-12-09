import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {ProductsService} from '../../../../core/services/products.service';
import {Product} from '../../../../shared/models/product';
import {CurrencyPipe, KeyValuePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {CartService} from '../../../../core/services/cart.service';
import {FormsModule} from '@angular/forms';

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
    KeyValuePipe,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  standalone: true,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productsService = inject(ProductsService);
  cartService = inject(CartService);

  productId = input<string>();

  product = signal<Product | undefined>(undefined);

  stockMessage = computed(()=> this.product()?.stockQuantity! > 10 ? 'in stock' : 'running out');

  quantityInCart = computed(()=>{
    const item = this.cartService.cart()?.cartItems.find(z=>z.productId.toString() === this.productId());
    return item?.quantity || 0
  });

  quantity = signal<number>(1);

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

  UpdateProductInCart(){
    if(this.quantityInCart() < this.quantity()){
      const itemsToAdd = this.quantity() - this.quantityInCart();
      this.cartService.addCartItemToCart(this.product()!, itemsToAdd);
    }
    else{
      const itemsToRemove = this.quantityInCart() - this.quantity();
      this.cartService.removeItemFromCart(Number(this.productId()), itemsToRemove);
    }
  }

  protected getButtonText(){
    return this.quantityInCart() > 0 ? "Update cart" : "Add to cart";
  }
}
