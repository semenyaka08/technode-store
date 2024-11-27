import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{
  httpClient: HttpClient = inject(HttpClient);

  getCategories(){
    return this.httpClient.get<Category[]>('http://localhost:5104/api/categories');
  }
}
