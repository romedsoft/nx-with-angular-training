import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setItem(data: { key: string, value: string | undefined }){

    if(!data.value)
      return;

    localStorage.setItem(data.key, data.value);
  }

  removeItem(key : string){
    localStorage.removeItem(key);
  }
}
