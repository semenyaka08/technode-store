import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {PageResult} from '../../shared/models/page-result';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProductsByCategory(categoryName: string) {
    return this.httpClient.get<PageResult<Product>>(`http://localhost:5104/api/products/${categoryName}`);
  }
}
