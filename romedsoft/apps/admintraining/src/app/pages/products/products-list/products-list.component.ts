import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@romedsoft/products';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent  implements OnInit {
  products : Array<Product> = [];

  constructor(private productsService : ProductsService
    ,private router : Router
    ,private messageService : MessageService
    ,private confirmationService: ConfirmationService) {
    
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(productId : string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const observer = {
          next: ()=> {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The product was deleted' });
            this._getProducts();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The product was not deleted' });
          },
        };
    
        this.productsService.deleteProduct(productId).subscribe(observer);
      }
    });
  }

  editProduct(productId : string){
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(prods => {
      this.products = prods;
   });
  }
}
