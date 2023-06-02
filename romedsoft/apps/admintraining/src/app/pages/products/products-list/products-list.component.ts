import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@romedsoft/products';

@Component({
  selector: 'admin-products',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent  implements OnInit {
  products : Array<Product> = [];

  constructor(private productsService : ProductsService) {
    
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(productId : string){
    
  }

  editProduct(productId : string){

  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(prods => {
      this.products = prods;
   });
  }
}
