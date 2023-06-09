import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Order } from '@romedsoft/orders';
import { Observable } from 'rxjs';

const ORDER_STATUS : any = {
  'Pending' : {
    label: 'Pending',
    color: 'primary'
  },
  'Processed' : {
    label: 'Processed',
    color: 'warning'
  },
  'Shipped' : {
    label: 'Shipped',
    color: 'warning'
  },
  'Delivered' : {
    label: 'Delivered',
    color: 'success'
  },
  'Failed': {
    label: 'Failed',
    color: 'danger'
  }
};


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

  updateOrderStatus(id :string, orderStatus : { status : string}) {
    return this.http.put(this.ordersUrl + "/" + id, orderStatus);
  }

  getOrderStatusDictionary(){
      return ORDER_STATUS;
  }

  getOrderStatusList(){
    return Object.keys(ORDER_STATUS).map(key => {
        return {
          id: key,
          name : ORDER_STATUS[key].label
        }
    });
  }

  getTotalOrders() {
    return this.http.get(this.ordersUrl + "/get/count");
  } 

  getTotalSales() {
    return this.http.get(this.ordersUrl + "/get/totalsales");
  }

}
