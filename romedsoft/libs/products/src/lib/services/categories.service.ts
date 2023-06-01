import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '../models/category.model'


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  getCategories() : Observable<Array<Category>>  {
     return this.http.get<Array<Category>>("http://localhost:3000/api/v1/categories");
  }
}
