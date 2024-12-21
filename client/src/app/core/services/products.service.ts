import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {PageResult} from '../../shared/models/page-result';
import {ShopParameters} from '../../shared/models/shopParameters';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getProducts(shopParameters: ShopParameters) {
    let url = `${this.baseUrl}products${shopParameters.categoryName ? `/${shopParameters.categoryName}` : ''}`;
    const params = new URLSearchParams();

    if(shopParameters.filters){
      for (const [key, values] of Object.entries(shopParameters.filters)) {
        for (const value of values) {
          params.append(`filters[${key}]`, value);
        }
      }
    }


    if(shopParameters.selectedSort){
      params.append(`sortBy`, shopParameters.selectedSort.sortBy);
      params.append(`sortDirection`, shopParameters.selectedSort.sortDirection);
    }

    if(shopParameters.paginationParams){
      params.append(`pageSize`, shopParameters.paginationParams.pageSize.toString());
      params.append(`pageNumber`, shopParameters.paginationParams.pageNumber.toString());
    }

    if(shopParameters.searchPhrase){
      params.append(`searchPhrase`, shopParameters.searchPhrase)
    }

    url += `?${params.toString()}`;

    console.log(url);

    return this.httpClient.get<PageResult<Product>>(url);
  }

  getProductById(productId: string){
    let url = `${this.baseUrl}products/${productId}`;

    return this.httpClient.get<Product>(url);
  }
}
