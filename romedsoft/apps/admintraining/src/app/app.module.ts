import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories-list/categories.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './pages/categories/categories/category-form/category-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { CategoriesService, ProductsService } from '@romedsoft/products';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';
import { AuthService, UsersModule, JwtInterceptor } from '@romedsoft/users';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesComponent, CategoryFormComponent, ProductsListComponent, ProductFormComponent, UsersListComponent, UserFormComponent, OrdersListComponent, OrdersDetailsComponent, DashboardItemComponent],
    imports: 
    [
      BrowserModule, 
      BrowserAnimationsModule,  
      FormsModule, 
      CommonModule,
      ReactiveFormsModule, 
      HttpClientModule, 
      SharedModule, 
      AppRoutingModule,
      UsersModule
    ]
    ,providers: [MessageService, ConfirmationService, ProductsService, CategoriesService, AuthService
    ,{ provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor,  multi : true}],
    bootstrap: [AppComponent],
    exports: [
      ShellComponent,
      SidebarComponent,
      DashboardComponent,
      CategoriesComponent,
      CategoryFormComponent,
      ProductsListComponent,
      ProductFormComponent,
      UsersListComponent,
      UserFormComponent,
      OrdersListComponent,
      OrdersDetailsComponent,
      DashboardItemComponent
    ]
})
export class AppModule {}
