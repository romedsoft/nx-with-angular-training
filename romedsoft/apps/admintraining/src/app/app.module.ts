import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories-list/categories.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './pages/categories/categories/category-form/category-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { CategoriesService, ProductsService } from '@romedsoft/products';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesComponent, CategoryFormComponent, ProductsListComponent, ProductFormComponent, UsersListComponent, UserFormComponent],
    imports: [BrowserModule, BrowserAnimationsModule,  FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })],
    providers: [MessageService, ConfirmationService, ProductsService, CategoriesService],
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
      UserFormComponent
    ]
})
export class AppModule {}
