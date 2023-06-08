import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    const isAuthenticated = this.authService.isAuthenticated()

    console.log(isAuthenticated);
    if(!isAuthenticated)
    {
      this.router.navigate(['/login']);
    }

    return of<boolean>(isAuthenticated).pipe(delay(10), map((x: boolean) => x ));

   }
}
