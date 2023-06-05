import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@romedsoft/products';
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
  categories : Array<Category> = [];
  selectedCategory! : Category;
  imageDisplay!: string | ArrayBuffer | null;

  constructor(private formBuilder: FormBuilder,
    private productsService : ProductsService,
    private categoriesService : CategoriesService,
    private messageService: MessageService
    ,private location : Location,
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
        ,isFeatured : [false]
        ,image : ['']
      });
  
      this._checkEditMode();
      this._getCategories();
    }

    onSubmit(){

    }

    onCategoryChange(e: any){
      console.log(e);
    }

    onImageUpload(event: any){
      console.log(event);
      const file = event.target.files.length > 0 ? event.target.files[0] : null;

      if(file){
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
          this.imageDisplay = fileReader.result;
        };
        fileReader.readAsDataURL(file);
      }

    }

    private _getCategories(){

      const getCategoriesObserver = {
        next: (categories: Category[])=> {
          this.categories = categories;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There are problems trying to get the categories list.' });
        },
      };

      this.categoriesService.getCategories().subscribe(getCategoriesObserver);
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
                this.form.controls.isFeatured.setValue(product.isFeatured)
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The category was not found' });
              },
            };
  
            this.productsService.getProduct(params.id).subscribe(getProductObserver);
          }
      });
    }
  

}
