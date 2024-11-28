import {Component, inject, OnInit} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CategoriesService} from '../../../core/services/categories.service';
import {Category} from '../../../shared/models/category';

@Component({
  selector: 'app-categories',
  imports: [
    MatNavList,
    MatListItem,
    CategoryItemComponent
  ],
  templateUrl: './categories.component.html',
  standalone: true,
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categoriesService = inject(CategoriesService);
  categories: Category[] = [];

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({

      next: data=> this.categories = data,

      error: err => console.log(err)
    })
  }
}
