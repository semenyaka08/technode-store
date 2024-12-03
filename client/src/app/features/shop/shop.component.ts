import {Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import {ProductsService} from '../../core/services/products.service';
import {Product} from '../../shared/models/product';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Category} from '../../shared/models/category';
import {CategoriesService} from '../../core/services/categories.service';
import {FiltersComponent} from './filters/filters.component';
import {ProductsComponent} from './products/products.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {PageResult} from '../../shared/models/page-result';
import {MatPaginator} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {ShopParameters} from '../../shared/models/shopParameters';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-category-products',
  imports: [
    FiltersComponent,
    ProductsComponent,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatIcon,
    MatPaginator,
    FormsModule,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './shop.component.html',
  standalone: true,
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productsService = inject(ProductsService);
  categoryService = inject(CategoriesService);

  categoryName = input<string>();
  category = signal<Category | undefined>(undefined);
  searchPhrase = input<string>();
  sortBy = input<string>();
  sortDirection = input<string>();
  pageNumber = input<number>();
  pageSize = input<number>();
  filters = signal<Record<string, string[]> | undefined>(undefined);

  pageResult = signal<PageResult<Product> | undefined>(undefined);

  shopParameters = computed(()=>{
    const shopParameters: ShopParameters = {
      categoryName: this.categoryName(),
      selectedSort: {sortBy: this.sortBy() ?? 'name', sortDirection: this.sortDirection() ?? 'asc'},
      paginationParams: {pageNumber: this.pageNumber() ?? 1, pageSize: this.pageSize() ?? 12},
      searchPhrase: this.searchPhrase(),
      filters: this.filters()
    }
    return shopParameters;
  });

  constructor() {
    effect(async () => {
      await this.loadCategory();
    });

    effect(() => {
      this.productsService.getProducts(this.shopParameters()).subscribe({
        next: data=> {
          this.pageResult.set(data);
          console.log(this.pageResult());
        },
        error: err=> console.log(err)
      });
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const filters: Record<string, string[]> = {};

      Object.keys(params).forEach(key => {
        const match = key.match(/^filters\[(\d+)]$/);
        if (match) {
          const index = match[1];
          if (!filters[index]) {
            filters[index] = [];
          }

          const value = params[key];
          if (Array.isArray(value)) {
            filters[index].push(...value);
          } else {
            filters[index].push(value);
          }
        }
      });

      this.filters.set(filters);
    });
  }

  private async loadCategory() {
    const categories = await firstValueFrom(this.categoryService.getCategories());

    this.category.set(categories.find(cat => cat.name.toLowerCase() === this.categoryName()?.toLowerCase()));
  }

}
