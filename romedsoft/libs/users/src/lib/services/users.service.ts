import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@romedsoft/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService { 
  
  usersUrl = environment.apiHost + "users";
  constructor(private http : HttpClient) { }

  getUsers() : Observable<Array<User>>  {
    return this.http.get<Array<User>>(this.usersUrl);
  }

  createUser(user : User) : Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  deleteUser(id : string){
    return this.http.delete(this.usersUrl + "/" + id );
  }

  getUser(id : string) : Observable<User>{
    return this.http.get<User>(this.usersUrl + "/" + id );
  }

  updateUser(id :string, user : User) {
    return this.http.put(this.usersUrl + "/" + id, user);
  }
}
