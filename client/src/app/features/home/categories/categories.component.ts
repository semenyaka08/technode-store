import {Component, inject, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CategoriesService} from '../../../core/services/categories.service';
import {Category} from '../../../shared/models/category';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {OverlayService} from '../../../core/services/overlay.service';

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
export class CategoriesComponent implements OnInit, OnDestroy{
  categoriesService = inject(CategoriesService);
  mainCategories: Category[] = [];
  activeCategory?: Category;
  displayCategories = false;
  overlayService = inject(OverlayService);

  ngOnInit() {
    this.categoriesService.getCategories({isMainCategory: true}).subscribe({

      next: data=> {
        this.mainCategories = data;
        this.activeCategory = data[0];
      },

      error: err => console.log(err)
    })
  }

  ngOnDestroy() {
    this.overlayService.displayOverlay.set(false)
  }

  onDisplayCategories(){
    this.displayCategories = ! this.displayCategories;
    this.overlayService.displayOverlay.set(this.displayCategories)
  }
}
