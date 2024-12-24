import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatCardTitle} from '@angular/material/card';
import {CategoriesComponent} from './categories/categories.component';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-shop',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    CategoriesComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Output() toggleOverlay = new EventEmitter<boolean>();
}
