import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@romedsoft/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-user',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  userId! : string ;

  constructor(private formBuilder: FormBuilder,
    private usersService : UsersService
    ,private messageService: MessageService
    , private location : Location,
    private route : ActivatedRoute){}

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name : ['', Validators.required],
        email : ['', Validators.required]
        ,phone : ['', Validators.required]
        ,isAdmin : [false, Validators.required]
        ,street : ['', Validators.required]
        ,apartment : ['', Validators.required]
        ,zip : ['', Validators.required]
        ,city : ['', Validators.required]
        ,country : ['', Validators.required]
      });
  
      this._checkEditMode();
    }
  
    onSubmit(): void {
      this.isSubmited = true;
      if(this.form.valid){
  
        const user :  User = {
          name: this.form.controls.name.value,
          email: this.form.controls.email.value,
          phone : this.form.controls.phone.value,
          isAdmin : this.form.controls.isAdmin.value,
          street : this.form.controls.street.value,
          apartment : this.form.controls.apartment.value,
          zip : this.form.controls.zip.value,
          city : this.form.controls.city.value,
          country : this.form.controls.country.value
        };
        const userObserver  = {
          next: (user: User)=> {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `The user ${user.name} was ${this.editMode ? 'updated' : 'created' }` });
            timer(2000).toPromise().then(() => {
              this.location.back();
            });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `The user was not  ${this.editMode ? 'updated' : 'created' }` });
          },
        };
  
        if(this.editMode){
          this.usersService.updateUser(this.userId, user).subscribe(userObserver);
        }else{
          this.usersService.createUser(user).subscribe(userObserver);
        }
  
      }
      
  
    }

    private _checkEditMode(){
      this.route.params.subscribe( params => {
          if(params.id){
            this.editMode = true;
            this.userId = params.id;
            const getUserObserver = {
              next: (user: User)=> {
                this.form.controls.name.setValue(user.name);
                this.form.controls.email.setValue(user.email);
                this.form.controls.phone.setValue(user.phone);
                this.form.controls.isAdmin.setValue(user.isAdmin);
                this.form.controls.street.setValue(user.street);
                this.form.controls.apartment.setValue(user.apartment);
                this.form.controls.zip.setValue(user.zip);
                this.form.controls.city.setValue(user.city);
                this.form.controls.country.setValue(user.country);
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The user was not found' });
              },
            };
  
            this.usersService.getUser(params.id).subscribe(getUserObserver);
          }
      });
    }

}
