import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatCardTitle} from '@angular/material/card';
import {CategoriesComponent} from './categories/categories.component';
@Component({
  selector: 'app-shop',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    CategoriesComponent,
  ],
  templateUrl: './shop.component.html',
  standalone: true,
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

}
