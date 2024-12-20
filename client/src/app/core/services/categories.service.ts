import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{
  httpClient: HttpClient = inject(HttpClient);

  getCategories(params?: { [key: string]: string | number | boolean }){
    let queryParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams = queryParams.set(key, params[key].toString());
        }
      }
    }

    return this.httpClient.get<Category[]>('http://localhost:5104/api/categories', { params: queryParams });
  }
}
