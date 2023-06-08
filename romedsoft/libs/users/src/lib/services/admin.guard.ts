import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isAdmin = this.authService.isAdmin()
    console.log(isAdmin);
    if(!isAdmin)
    {
      this.router.navigate(['/unauthorized']);
    }

    return isAdmin;

   }
}