import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User, UserLogin } from '@romedsoft/users';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

const JWT_TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUsersUrl = environment.apiHost + "users";
  constructor(private http : HttpClient, private localStorageService : LocalstorageService) { }

  login(email : string, password : string ) : Observable<UserLogin>{
    return this.http.post<UserLogin>(this.authUsersUrl + "/login", { email, password});
  }

  getToken(){
    return this.localStorageService.getItem(JWT_TOKEN);
  }

  setToken(user : UserLogin){
    return this.localStorageService.setItem({ key : JWT_TOKEN, value : user.token});
  }

}
