import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../../shared/models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{
  httpClient: HttpClient = inject(HttpClient);

  getCategories(){
    return this.httpClient.get<CategoryModel[]>('http://localhost:5104/api/categories');
  }
}
