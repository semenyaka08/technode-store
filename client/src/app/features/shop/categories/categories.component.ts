import {Component, inject, OnInit} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CategoriesService} from '../../../core/services/categories.service';
import {CategoryModel} from '../../../shared/models/category-model';

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
  categories: CategoryModel[] = [];

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({

      next: data=> this.categories = data,

      error: err => console.log(err)
    })
  }

  onCategorySelected(category: CategoryModel) {

  }
}
