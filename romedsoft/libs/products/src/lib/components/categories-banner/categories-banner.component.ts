import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';

import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories : Category[] = [];
  endSubs$ : Subject<any> = new Subject<any>();

  constructor(private categoriesService:  CategoriesService){}

  ngOnInit(): void {
   this.categoriesService.getCategories()
   .pipe(takeUntil(this.endSubs$))
   .subscribe((categories : Category[])=> {
    this.categories = categories;
   })
  }

  ngOnDestroy(): void {
    this.endSubs$.next({});
    this.endSubs$.complete();
  }
}
