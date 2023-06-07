import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'romedsoft-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : ['', Validators.required]
      ,password : ['', Validators.required]
    });
  }

  onSubmit(){
    this.isSubmited = true;
    if(this.form.valid){

      // const category :  Category = {
      //   name: this.form.controls.name.value,
      //   icon: this.form.controls.icon.value,
      //   color : this.form.controls.color.value
      // };
      // const categoryObserver  = {
      //   next: (category: Category)=> {
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `The category ${category.name} was ${this.editMode ? 'updated' : 'created' }` });
      //     timer(2000).toPromise().then(() => {
      //       this.location.back();
      //     });
      //   },
      //   error: () => {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `The category was not  ${this.editMode ? 'updated' : 'created' }` });
      //   },
      // };

      // if(this.editMode){
      //   this._updateCategory(category,categoryObserver);
      // }else{
      //   this._createCategory(category,categoryObserver);
      // }

    }
  }
}
