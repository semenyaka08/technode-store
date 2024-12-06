import {Component, inject, Input} from '@angular/core';
import {Product} from '../../../../shared/models/product';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {CartService} from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    CurrencyPipe,
    MatCardActions,
    MatButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product?: Product;
  protected cartService = inject(CartService);
}
