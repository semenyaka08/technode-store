import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageResult} from '../../shared/models/pageResult';
import {Product} from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:5104/api';
  private httpClient = inject(HttpClient);

  getPage() {
    return this.httpClient.get<PageResult<Product>>(this.baseUrl + '/products');
  }

  getTypes() {
    return this.httpClient.get<string[]>(this.baseUrl + '/products/types');
  }

  getBrands() {
    return this.httpClient.get<string[]>(this.baseUrl + '/products/brands');
  }
}
