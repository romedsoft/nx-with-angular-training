import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User, UserLogin } from '@romedsoft/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'romedsoft-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;

  constructor(
    private formBuilder: FormBuilder
    ,private authService :  AuthService
    ,private localStorageService : LocalstorageService
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

      const loginObserver  = {
        next: (user: UserLogin)=> {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `The credential are valid.` });
          console.log(user);
          this.localStorageService.setItem({ key : 'token', value : user.token});
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if(error.status !== 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error in the server, please try again later.` });
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `The credentials are invalid.` });
          }  
        },
      };

      this.authService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(loginObserver);

    }
  }



}
