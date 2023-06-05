import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@romedsoft/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


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
  imageDisplay: string | ArrayBuffer | null | undefined;

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
        ,image : ['', Validators.required]
      });
  
      this._checkEditMode();
      this._getCategories();
    }

    onSubmit(){
      this.isSubmited = true;
      if(this.form.invalid)
        return;

        const productFormData = new FormData();

        Object.keys(this.form.controls).map((key)=> {
          console.log(this.form.controls[key].value);
          productFormData.append(key,this.form.controls[key].value);
        });

        this._saveProduct(productFormData);
    }

    onCategoryChange(e: any){
      console.log(e);
      this.selectedCategory = this.categories.filter((item)=> {
        return item.id == e.value;
      })[0];
    }

    onImageUpload(event: any){
      console.log(event);
      const file = event.target.files.length > 0 ? event.target.files[0] : null;

      if(file){

        this.form.patchValue({image: file});
        this.form.get("image")?.updateValueAndValidity();

        const fileReader = new FileReader();
        fileReader.onload = ()=>{
          this.imageDisplay = fileReader.result;
        };
        fileReader.readAsDataURL(file);
      }

    }

    _saveProduct(productFormData : FormData){

      const productObserver  = {
        next: (product: Product)=> {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `The product ${product.name} was ${this.editMode ? 'updated' : 'created' }` });
          timer(2000).toPromise().then(() => {
            this.location.back();
          });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `The product was not  ${this.editMode ? 'updated' : 'created' }` });
        },
      };

      if(this.editMode){
        this.productsService.updateProduct(this.productId, productFormData).subscribe(productObserver);
      }else{
        this.productsService.createProduct(productFormData).subscribe(productObserver);
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
                this.form.controls.category.setValue(product.category?.id)
                this.form.controls.countInStock.setValue(product.countInStock)
                this.form.controls.isFeatured.setValue(product.isFeatured)

                if(product.category)
                  this.selectedCategory = product.category;

                this.imageDisplay = product.image;
                this.form.controls.image.setValidators([]);
                this.form.get("image")?.updateValueAndValidity();
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The product was not found' });
              },
            };
  
            this.productsService.getProduct(params.id).subscribe(getProductObserver);
          }
      });
    }
  

}
