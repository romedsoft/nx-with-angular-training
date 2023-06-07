import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@romedsoft/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-order-details',
  templateUrl: './orders-details.component.html',
  styles: [
  ]
})
export class OrdersDetailsComponent  implements OnInit {

  order! : Order;
  orderStatus! : any[];
  orderId! : string;
  selectedStatus! : any;

  constructor(private ordersService : OrdersService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router,
    private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    
    this._initStatusList();
    this._getOrder();
  }

  onStatusChange(event :any){
    const updateObserver = {
      next: (order: Order)=> {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The status was updated' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The order was not found' });
      },
    };

    this.ordersService.updateOrderStatus(this.orderId, { status : event.value} ).subscribe(updateObserver);
  }

  getOrderItems(order : Order) : OrderItem[]{

    const items  = order.orderItems;
    if(!items)
    return [];

    return items;
  }

  private _initStatusList(){
    this.orderStatus = this.ordersService.getOrderStatusList();
  }

  private _getOrder(){
    this.route.params.subscribe( params => {
      if(params.id){
        this.orderId = params.id;
        const getObserver = {
          next: (order: Order)=> {
            this.order = order;
            this.selectedStatus = order.status;
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The order was not found' });
          },
        };

        this.ordersService.getOrder(params.id).subscribe(getObserver);
      }
  });
  }

}
