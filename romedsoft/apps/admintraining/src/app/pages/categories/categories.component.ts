import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category} from '@romedsoft/products'

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements OnInit {

  categories : Array<Category> = [];

  constructor(private categoriesService : CategoriesService) {

  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats => {
       this.categories = cats;
    });
  }


}
