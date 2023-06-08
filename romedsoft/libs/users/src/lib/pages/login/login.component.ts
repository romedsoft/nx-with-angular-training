import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '@romedsoft/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'romedsoft-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  errorAuth = false;

  constructor(
    private formBuilder: FormBuilder
    ,private authService :  AuthService
    , private messageService : MessageService
    , private location : Location){


    }

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
      const loginObserver  = {
        next: (user: User)=> {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `The credential are valid.` });
          console.log(user);
        },
        error: (error: any) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `The credentials are invalid.` });
        },
      };

      const user = this.authService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(loginObserver);

      

    }
  }



}
