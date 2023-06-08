import { Component, OnInit } from '@angular/core';
import { AuthService } from '@romedsoft/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService : AuthService)  {

    
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
  }

}
