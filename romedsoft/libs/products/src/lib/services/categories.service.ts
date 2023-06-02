import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '../models/category.model'
import { environment } from  '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categoriesUrl = environment.apiHost + "categories";
  constructor(private http : HttpClient) { }

  getCategories() : Observable<Array<Category>>  {
     return this.http.get<Array<Category>>(this.categoriesUrl);
  }

  createCategory(category : Category) {
    return this.http.post(this.categoriesUrl, category);
  }

  deleteCategory(categoryId : string){
    return this.http.delete(this.categoriesUrl + "/" + categoryId );
  }

  getCategory(categoryId : string) : Observable<Category>{
    return this.http.get<Category>(this.categoriesUrl + "/" + categoryId );
  }

  updateCategory(categoryId :string, category : Category) {
    return this.http.put(this.categoriesUrl + "/" + categoryId, category);
  }
}
