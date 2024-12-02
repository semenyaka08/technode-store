import {Component, inject, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../core/services/products.service';
import {Product} from '../../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
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
    MatIconButton
  ],
  templateUrl: './shop.component.html',
  standalone: true,
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productsService = inject(ProductsService);
  categoryService = inject(CategoriesService);

  pageSizeOptions = [12, 24, 36];
  sortOptions = [
    { name: "Price: Low-High", sortBy: "price", sortDirection: "asc" },
    { name: "Price: High-Low", sortBy: "price", sortDirection: "desc" },
    { name: "Name", sortBy: "name", sortDirection: "asc" }]

  @Input() categoryName?: string; //getting categoryName from route if it is provided
  @Input() searchPhrase?: string; //getting searchPhrase from query parameters if it is provided

  category?: Category;
  shopParameters: ShopParameters = {};
  pageResult?: PageResult<Product>;

  async ngOnInit(): Promise<void> {
    this.shopParameters = {
      categoryName: this.categoryName || '',
      searchPhrase: this.searchPhrase || '',
      paginationParams: {
        pageNumber: Number(this.activatedRoute.snapshot.queryParamMap.get('pageNumber')) || 1,
        pageSize: Number(this.activatedRoute.snapshot.queryParamMap.get('pageSize')) || 12
      },
      selectedSort: {
        sortBy: this.activatedRoute.snapshot.queryParamMap.get('sortBy') || 'name',
        sortDirection: this.activatedRoute.snapshot.queryParamMap.get('sortDirection') || 'asc'
      },
      filters: []
    };

    try {
      await this.loadCategory();

      this.loadFiltersFromQueryParams();

      this.getProducts();
    } catch (error) {
      console.error('Error initializing shop component:', error);
    }
  }

  private getProducts(){
    this.productsService.getProducts(this.shopParameters).subscribe({
      next: (pageResult) => {
        this.pageResult = pageResult;
      },
      error: (error)=> console.log(error)
    });
  }

  private async loadCategory(): Promise<void> {
    const categories = await firstValueFrom(this.categoryService.getCategories());
    this.category = categories.find(
      (z) => z.name.toLowerCase() === this.categoryName?.toLowerCase()
    );
    if (!this.category) {
      throw new Error(`Category ${this.categoryName} not found`);
    }
  }

  private loadFiltersFromQueryParams(): void {

    const queryParams = this.activatedRoute.snapshot.queryParamMap;

    const filters: { filter: Specification, selectedValues: string[] }[] = [];

    queryParams.keys.forEach((key) => {
      const match = key.match(/Filters\[(.+)]/);
      if (match && this.category?.specifications) {
        const specificationId = match[1];
        const values = queryParams.getAll(key);

        const specification = this.category.specifications.find((s) => s.id.toString() === specificationId);
        if (specification) {
          filters.push({
            filter: specification,
            selectedValues: values,
          });
        }
      }
    });
    this.shopParameters.filters = filters.length > 0 ? filters : this.shopParameters.filters;
  }

  updateQueryParams(queryParams: { [key: string]: string | undefined }): void {
    const filteredParams = Object.keys(queryParams).reduce((acc, key) => {
      const value = queryParams[key];
      acc[key] = value === "" ? null : value || null;
      return acc;
    }, {} as { [key: string]: string | null });

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filteredParams,
      queryParamsHandling: 'merge',
    });

    this.getProducts();
  }


  onSearchChange(): void {
      this.shopParameters.searchPhrase = this.searchPhrase;

      this.updateQueryParams({'searchPhrase': this.searchPhrase});
  }

  onFilterChange(selectedFilters: { filter: Specification, selectedValues: string[] }[]): void {
    this.shopParameters.filters = selectedFilters;
  }

  onSortChange(sortEvent: MatSelectionListChange): void {
    const selectedOption = sortEvent.options[0];
    if(selectedOption){
      this.shopParameters.selectedSort = {
        sortBy: selectedOption.value.sortBy,
        sortDirection: selectedOption.value.sortDirection}
      this.updateQueryParams({'sortBy': this.shopParameters.selectedSort.sortBy, 'sortDirection': this.shopParameters.selectedSort.sortDirection});
    }
  }

  onPageEvent($event: PageEvent) {
    this.shopParameters.paginationParams!.pageSize = $event.pageSize;
    this.shopParameters.paginationParams!.pageNumber = $event.pageIndex + 1;
    this.updateQueryParams({'pageNumber': this.shopParameters.paginationParams!.pageNumber.toString(), 'pageSize': this.shopParameters.paginationParams!.pageSize.toString()});
  }
}
