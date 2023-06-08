import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserLogin } from '@romedsoft/users';
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

  isAuthenticated(){
    const jwttoken = this.localStorageService.getItem(JWT_TOKEN);

    if(!jwttoken)
      return false;

    if(!this._isValidJwtToken(jwttoken)){
      return false;
    }

    return true;
  }

  getDecodedToken(){
    const jwttoken = this.localStorageService.getItem(JWT_TOKEN);

    if(!jwttoken)
     return null;

    const tokenDecode = JSON.parse(atob(jwttoken.split('.')[1]));

    return tokenDecode;
  }

  isAdmin(){
    const tokenDecode = this.getDecodedToken();

    if(!tokenDecode)
    return false;

    return tokenDecode.isAdmin;

  }

  private _tokenExpired(expiration : number){
    return Math.floor(new Date().getTime() / 1000 ) >= expiration;
  }

  private _isValidJwtToken(token : string){

    try{
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if(this._tokenExpired(tokenDecode.exp)){
        return false;
      }

      return true;
    }catch(e){
      return false;
    }
    
    
  }

}
