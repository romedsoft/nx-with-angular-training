import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from "@romedsoft/orders";
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-orders',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus! : any;

  constructor(private ordersService : OrdersService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router) {

  }

  ngOnInit(): void {
    this.orderStatus = this.ordersService.getOrderStatusDictionary();
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(this.orderStatus);
   });
  }

  getOrderStatus(status : string){

    console.log(this.orderStatus[status]);
    return this.orderStatus[status];
  }

  deleteOrder(orderId : string ) : void {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const observer = {
          next: ()=> {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The order was deleted' });
            this._getOrders();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The order was not deleted' });
          },
        };
    
        this.ordersService.deleteOrder(orderId).subscribe(observer);
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
  });
    
  }

  showOrder(orderId : string) : void {
    this.router.navigateByUrl(`order/${orderId}`)
  }

}
