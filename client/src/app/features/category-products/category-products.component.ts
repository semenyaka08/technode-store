import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../core/services/products.service';
import {Product} from '../../shared/models/product';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../shared/models/category';
import {CategoriesService} from '../../core/services/categories.service';
import {FiltersComponent} from './filters/filters.component';
import {ProductsComponent} from './products/products.component';

@Component({
  selector: 'app-category-products',
  imports: [
    FiltersComponent,
    ProductsComponent
  ],
  templateUrl: './category-products.component.html',
  standalone: true,
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  categoryService = inject(CategoriesService);
  products: Product[] = [];
  category?: Category;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') || undefined;
    if(!categoryName) return;
    this.productsService.getProductsByCategory(categoryName).subscribe(
      {
        next: (pageResult) => {
          this.products = pageResult.items;

          if(this.products.length === 0)
            console.log('No products found');
          else {
            console.log('Products found');
            console.log(this.products);
          }

          this.categoryService.getCategories().subscribe({
            next: (categories) => {
              this.category = categories.find(category => category.name === categoryName);
              console.log(this.category?.specifications);
            },
            error: (error) => {console.log(error);}
          })
          },
        error: (error) => {console.log(error);}
      }
    )
  }
}
