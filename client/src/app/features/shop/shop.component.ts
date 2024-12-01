import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../core/services/products.service';
import {Product} from '../../shared/models/product';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../shared/models/category';
import {CategoriesService} from '../../core/services/categories.service';
import {FiltersComponent} from './filters/filters.component';
import {ProductsComponent} from './products/products.component';
import {Specification} from '../../shared/models/specification';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {PageResult} from '../../shared/models/page-result';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {ShopParameters} from '../../shared/models/shopParameters';

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
    MatIconButton
  ],
  templateUrl: './shop.component.html',
  standalone: true,
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  categoryService = inject(CategoriesService);
  pageResult?: PageResult<Product>;
  category?: Category;
  pageSizeOptions = [3, 12, 24, 36];
  sortOptions = [
    { name: "Price: Low-High", sortBy: "price", sortDirection: "asc" },
    { name: "Price: High-Low", sortBy: "price", sortDirection: "desc" },
    { name: "Name", sortBy: "name", sortDirection: "asc" }]

  shopParameters: ShopParameters = {
    paginationParams: { pageSize: 12, pageNumber: 1 },
    selectedSort: {sortBy: "name", sortDirection: "asc"}
  };


  ngOnInit() {
    this.loadProducts();
  }

  getProducts(){
    this.productsService.getProducts(this.shopParameters).subscribe(
      {
        next: (pageResult) => {
          this.pageResult = pageResult;

          if(!this.category && this.shopParameters.categoryName){
            this.categoryService.getCategories().subscribe({
              next: (categories) => {
                this.category = categories.find(category => category.name === this.shopParameters.categoryName);
              },
              error: (error) => {console.log(error);}
            })
          }
        },
        error: (error) => {console.log(error);}
      }
    )
  }

  loadProducts() {
    this.shopParameters.categoryName = this.activatedRoute.snapshot.paramMap.get('category') || undefined;

    if(this.shopParameters.categoryName) this.shopParameters.categoryName = this.shopParameters.categoryName?.charAt(0).toUpperCase() + this.shopParameters.categoryName?.slice(1);

    this.shopParameters.searchPhrase = this.activatedRoute.snapshot.queryParamMap.get('searchPhrase') || undefined;

    this.getProducts();
  }

  onFilterChange(filters: { filter: Specification, selectedValues: string[] }[]) {
    this.shopParameters.filters = filters;
    this.shopParameters.paginationParams.pageNumber = 1;
    this.getProducts();
  }

  onSortChange($event: MatSelectionListChange) {
    const selectedOption = $event.options[0];
    if(selectedOption){
      this.shopParameters.selectedSort = {
        sortBy: selectedOption.value.sortBy,
        sortDirection: selectedOption.value.sortDirection
      }
      this.getProducts();
    }
  }

  onPageEvent($event: PageEvent) {
    this.shopParameters.paginationParams.pageSize = $event.pageSize;
    this.shopParameters.paginationParams.pageNumber = $event.pageIndex + 1;
    this.getProducts();
  }

  onSearchChange() {
    this.getProducts();
  }
}
