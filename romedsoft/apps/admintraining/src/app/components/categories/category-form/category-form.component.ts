import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@romedsoft/products';
import { MessageService } from 'primeng/api';
import { timer, of } from 'rxjs';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styles: [
  ]
})
export class CategoryFormComponent implements OnInit {

  form!: FormGroup;
  isSubmited : boolean = false;

  constructor(private formBuilder: FormBuilder,
     private categoriesService : CategoriesService
     ,private messageService: MessageService
     , private location : Location){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      icon : ['', Validators.required]
      // ,color : ['']
    });
  }

  onSubmit(): void {
    this.isSubmited = true;
    if(this.form.valid){

      const category :  Category = {
        name: this.form.controls.name.value,
        icon: this.form.controls.icon.value
      };

      const observer = {
        next: (response: any)=> {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The category was created' });
          timer(2000).toPromise().then(done => {
            this.location.back();
          });
        },
        error: (e: any) => {
          console.log(e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The category was not created' });
        },
      };

      this.categoriesService.createCategory(category).subscribe(observer);

    }
    

  }

}
