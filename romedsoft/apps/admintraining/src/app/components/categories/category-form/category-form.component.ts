import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@romedsoft/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styles: [
  ]
})
export class CategoryFormComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  categoryId! : string ;

  constructor(private formBuilder: FormBuilder,
     private categoriesService : CategoriesService
     ,private messageService: MessageService
     , private location : Location,
     private route : ActivatedRoute){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      icon : ['', Validators.required]
      ,color : ['#fff']
    });

    this._checkEditMode();
  }

  onSubmit(): void {
    this.isSubmited = true;
    if(this.form.valid){

      const category :  Category = {
        name: this.form.controls.name.value,
        icon: this.form.controls.icon.value,
        color : this.form.controls.color.value
      };
      const categoryObserver  = {
        next: (category: Category)=> {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `The category ${category.name} was ${this.editMode ? 'updated' : 'created' }` });
          timer(2000).toPromise().then(() => {
            this.location.back();
          });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `The category was not  ${this.editMode ? 'updated' : 'created' }` });
        },
      };

      if(this.editMode){
        this._updateCategory(category,categoryObserver);
      }else{
        this._createCategory(category,categoryObserver);
      }

    }
    

  }

  private _createCategory(category :  Category, categoryObserver: any){
    this.categoriesService.createCategory(category).subscribe(categoryObserver);
  }

  private _updateCategory(category :  Category, categoryObserver: any){
    this.categoriesService.updateCategory(this.categoryId, category).subscribe(categoryObserver);
  }

  private _checkEditMode(){
    this.route.params.subscribe( params => {
        if(params.id){
          this.editMode = true;
          this.categoryId = params.id;
          const getCategoryObserver = {
            next: (category: Category)=> {
              this.form.controls.name.setValue(category.name)
              this.form.controls.icon.setValue(category.icon)
              this.form.controls.color.setValue(category.color)
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The category was not found' });
            },
          };

          this.categoriesService.getCategory(params.id).subscribe(getCategoryObserver);
        }
    });
  }

}
