import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent  implements OnInit, OnDestroy {

  products : Product[] = [];

  endSubs$ : Subject<any> = new Subject<any>();

  constructor(private productsService:  ProductsService){}

  ngOnInit(): void {
   this.productsService.getFeaturedProducts(4)
   .pipe(takeUntil(this.endSubs$))
   .subscribe((products : Product[])=> {
    this.products = products;
   })
  }

  ngOnDestroy(): void {
    this.endSubs$.next({});
    this.endSubs$.complete();
  }
}
