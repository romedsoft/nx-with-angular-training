import { Component } from '@angular/core';
import { Product } from '@romedsoft/products';

@Component({
  selector: 'admin-products',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent {
  products : Array<Product> = [];


  deleteProduct(productId : string){
    
  }

  editProduct(productId : string){

  }
}
