import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@romedsoft/users'
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;


@Component({
  selector: 'admin-users',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users : Array<User> = [];
  countries!: { id: string; name: string; }[];

  constructor(private userService : UsersService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router) {
    
  }

  ngOnInit(): void {
    this._getCountries();
    this._getUsers();
    
  }

  private _getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
   });
  }

  getCountryName(countryCode : string){
    return this.countries.filter((item)=> {
      return item.id == countryCode;
    })[0].name;
  }

  private _getCountries(){
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(countriesLib.getNames('en', { select : 'official'})).map((entry) : { id : string, name: string}=>
    {
      console.log(entry);
      const country = { id : entry[0], name : entry[1]}
       return country;
    });
    
  }

  deleteUser(userId : string){
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const observer = {
            next: ()=> {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The user was deleted' });
              this._getUsers();
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The user was not deleted' });
            },
          };
      
          this.userService.deleteUser(userId).subscribe(observer);
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

  editUser(userId : string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }
}
