import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {CategoriesService} from '../../../core/services/categories.service';
import {ProductsService} from '../../../core/services/products.service';
import {Category} from '../../../shared/models/category';
import {MatDivider} from '@angular/material/divider';
import * as UC from '@uploadcare/file-uploader';
import {environment} from '../../../../environments/environment';
import "@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css"
import {ProductAddRequest} from '../../../shared/models/product';
import {Router} from '@angular/router';

UC.defineComponents(UC);

@Component({
  selector: 'app-catalog',
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf,
    MatInput,
    FormsModule,
    MatButton,
    MatList,
    MatListItem,
    MatDivider
  ],
  templateUrl: './catalog.component.html',
  standalone: true,
  styleUrl: './catalog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductsService);
  router = inject(Router);
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  uploadCarePublicKey = environment.uploadCarePublicKey;
  productForm: {
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    brand: string;
    stockQuantity: number;
    [key: string]: string | number;
  } = {
    name: '',
    description: '',
    price: 0,
    pictureUrl: '',
    brand: '',
    stockQuantity: 0,
  };

  @ViewChild('ctxProvider', { static: true }) ctxProvider!: ElementRef<typeof UC.UploadCtxProvider.prototype>;

  ngOnInit() {
    this.ctxProvider.nativeElement.addEventListener('change', this.handleUploadEvent);

    this.categoriesService.getCategories({ isMainCategory: false }).subscribe(
      (data) => {
        this.categories = data;
      }
    )
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      const commonFields = {
        name: this.productForm.name,
        description: this.productForm.description,
        price: this.productForm.price,
        pictureUrl: this.productForm.pictureUrl,
        brand: this.productForm.brand,
        stockQuantity: this.productForm.stockQuantity,
      };

      const specifications = this.selectedCategory.specifications.reduce((form, spec) => {
        form[spec.name] = '';
        return form;
      }, {} as { [key: string]: string });

      this.productForm = { ...commonFields, ...specifications };
    } else {
      this.productForm = {
        name: this.productForm.name,
        description: this.productForm.description,
        price: this.productForm.price,
        pictureUrl: this.productForm.pictureUrl,
        brand: this.productForm.brand,
        stockQuantity: this.productForm.stockQuantity,
      };
    }
  }

  addProduct() {
    if (!this.selectedCategory) {
      console.error('Category must be selected.');
      return;
    }

    const specifications = this.selectedCategory.specifications.reduce((specs, spec) => {
      specs[spec.name] = String(this.productForm[spec.name]);
      return specs;
    }, {} as { [key: string]: string });

    const { name, description, price, pictureUrl, brand, stockQuantity } = this.productForm;

    const productData: ProductAddRequest = {
      name,
      description,
      price: Number(price),
      pictureUrl,
      brand,
      stockQuantity: Number(stockQuantity),
      categoryId: this.selectedCategory.id,
      specifications,
    };

    this.productsService.addProduct(productData).subscribe({
      next:(data) => this.router.navigateByUrl(`products/${data.id}`),
      error:(err) => console.error(err)
    })
  }

  private handleUploadEvent = (e: Event) => {
    if(!(e instanceof CustomEvent))
      return;
    const file = e.detail;

    this.productForm.pictureUrl = file.successEntries[0].cdnUrl
  }
  protected readonly environment = environment;
}
