import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from '../../shared/models/category';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{
  httpClient: HttpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getCategories(params?: { [key: string]: string | number | boolean }){
    let queryParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams = queryParams.set(key, params[key].toString());
        }
      }
    }

    return this.httpClient.get<Category[]>(`${this.baseUrl}categories`, { params: queryParams });
  }
}
