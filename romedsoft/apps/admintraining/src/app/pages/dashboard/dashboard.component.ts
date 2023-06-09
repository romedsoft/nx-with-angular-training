import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@romedsoft/orders';
import { ProductsService } from '@romedsoft/products';
import { UsersService } from '@romedsoft/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  totalOrders = 0;

  totalProducts = 0;

  totalSales = 0.0;

  totalUsers = 0;
  /**
   *
   */
  constructor(private ordersService : OrdersService, private usersService : UsersService, private producsService: ProductsService) {
    
  }
  ngOnInit(): void {
    this.ordersService.getTotalOrders().subscribe((response: any) => {
        this.totalOrders = response.orderCount;
    });

    this.ordersService.getTotalSales().subscribe((response: any) => {
      this.totalSales = response.totalsales;
    })

    this.producsService.getTotalProducts().subscribe((response: any) => {
      this.totalProducts = response.productCount;
    })


    this.usersService.getTotalUsers().subscribe((response: any) => {
      this.totalUsers = response.userCount;
    })

  }

}
