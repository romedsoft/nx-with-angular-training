import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@romedsoft/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUsersUrl = environment.apiHost + "users";
  constructor(private http : HttpClient) { }

  login(email : string, password : string ) : Observable<User>{
    return this.http.post<User>(this.authUsersUrl + "/login", { email, password});
  }


}
