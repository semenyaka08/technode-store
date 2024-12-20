import {Component, inject, OnInit} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CategoriesService} from '../../../core/services/categories.service';
import {Category} from '../../../shared/models/category';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [
    MatNavList,
    MatListItem,
    CategoryItemComponent,
    NgForOf,
    NgIf,
    MatIcon,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  standalone: true,
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categoriesService = inject(CategoriesService);
  mainCategories: Category[] = [];
  activeCategory?: Category;
  displayCategories = false;

  ngOnInit() {
    this.categoriesService.getCategories({isMainCategory: true}).subscribe({

      next: data=> {
        this.mainCategories = data;
        this.activeCategory = data[0];
      },

      error: err => console.log(err)
    })
  }

  onDisplayCategories(){
    this.displayCategories = ! this.displayCategories;
  }
}
