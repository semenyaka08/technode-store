import {Component, Input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    CurrencyPipe,
    MatCardActions,
    MatButton,
    MatIcon
  ],
  templateUrl: './product-item.component.html',
  standalone: true,
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Product;
  @Input() types?: string[];
  @Input() brands?: string[];
}
