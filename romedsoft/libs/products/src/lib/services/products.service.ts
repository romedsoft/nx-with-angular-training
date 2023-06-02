import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '@romedsoft/products'
import { environment } from  '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsUrl = environment.apiHost + "products";
  constructor(private http : HttpClient) { }

  getProducts() : Observable<Array<Product>>  {
     return this.http.get<Array<Product>>(this.productsUrl);
  }

  createCategory(product : Product) {
    return this.http.post(this.productsUrl, product);
  }

  deleteCategory(id : string){
    return this.http.delete(this.productsUrl + "/" + id );
  }

  getCategory(id : string) : Observable<Product>{
    return this.http.get<Product>(this.productsUrl + "/" + id );
  }

  updateCategory(id :string, product : Product) {
    return this.http.put(this.productsUrl + "/" + id, product);
  }
}
