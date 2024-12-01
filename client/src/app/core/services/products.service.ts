import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {PageResult} from '../../shared/models/page-result';
import {ShopParameters} from '../../shared/models/shopParameters';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProducts(shopParameters: ShopParameters) {
    let url = `http://localhost:5104/api/products${shopParameters.categoryName ? `/${shopParameters.categoryName}` : ''}`;
    const params = new URLSearchParams();

    if (shopParameters.filters && shopParameters.filters.length > 0) {
      shopParameters.filters.forEach(f => {
        f.selectedValues.forEach(value => {
          params.append(`filters[${f.filter.id}]`, value);
        });
      });
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

    return this.httpClient.get<PageResult<Product>>(url);
  }

}
