import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User, UserLogin } from '@romedsoft/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUsersUrl = environment.apiHost + "users";
  constructor(private http : HttpClient) { }

  login(email : string, password : string ) : Observable<UserLogin>{
    return this.http.post<UserLogin>(this.authUsersUrl + "/login", { email, password});
  }

}
