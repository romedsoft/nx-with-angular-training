import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Order } from '@romedsoft/orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersUrl = environment.apiHost + "orders";
  constructor(private http : HttpClient) { }

  getOrders() : Observable<Array<Order>>  {
    return this.http.get<Array<Order>>(this.ordersUrl);
  }

  createOrder(order : Order) : Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order);
  }

  deleteOrder(id : string){
    return this.http.delete(this.ordersUrl + "/" + id );
  }

  getOrder(id : string) : Observable<Order>{
    return this.http.get<Order>(this.ordersUrl + "/" + id );
  }

  updateOrder(id :string, order : Order) {
    return this.http.put(this.ordersUrl + "/" + id, order);
  }
}
