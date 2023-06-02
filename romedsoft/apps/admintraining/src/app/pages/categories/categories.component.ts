import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category} from '@romedsoft/products'
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements OnInit {

  categories : Array<Category> = [];

  constructor(private categoriesService : CategoriesService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router) {

  }
  ngOnInit(): void {
    this._getCategories();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
   });
  }

  deleteCategory(categoryId : string ) : void {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const observer = {
          next: (response: any)=> {
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The category was deleted' });
            this._getCategories();
          },
          error: (e: any) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The category was not deleted' });
          },
        };
    
        this.categoriesService.deleteCategory(categoryId).subscribe(observer);
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
  });
    
  }

  editCategory(categoryId : string) : void {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

}
