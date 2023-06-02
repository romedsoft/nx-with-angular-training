import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@romedsoft/products';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'admin-products',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent  implements OnInit {
  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  productId! : string ;

  constructor(private formBuilder: FormBuilder,
    private categoriesService : ProductsService
    ,private messageService: MessageService
    , private location : Location,
    private route : ActivatedRoute){}

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name : ['', Validators.required]
        ,description : ['', Validators.required]
        ,brand : ['', Validators.required]
        ,price : [0.0, Validators.required]
        ,category : ['', Validators.required]
        ,countInStock : [0, Validators.required]
        ,richDescription : ['']
        ,rating : [0]
        ,numReviews : [0]
        ,isFeatured : [false]
        ,image : ['']
      });
  
      this._checkEditMode();
    }

    onSubmit(){

    }

    private _checkEditMode(){
      this.route.params.subscribe( params => {
          if(params.id){
            this.editMode = true;
            this.productId = params.id;

            const getProductObserver = {
              next: (product: Product)=> {
                this.form.controls.name.setValue(product.name)
                this.form.controls.description.setValue(product.description)
                this.form.controls.richDescription.setValue(product.richDescription)

                this.form.controls.brand.setValue(product.brand)
                this.form.controls.price.setValue(product.price)
                this.form.controls.category.setValue(product.category)
                this.form.controls.countInStock.setValue(product.countInStock)
                this.form.controls.rating.setValue(product.rating)
                this.form.controls.numReviews.setValue(product.numReviews)
                this.form.controls.isFeatured.setValue(product.isFeatured)
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The category was not found' });
              },
            };
  
            this.categoriesService.getCategory(params.id).subscribe(getProductObserver);
          }
      });
    }
  

}
