import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories-list/categories.component';
import { CategoryFormComponent } from './pages/categories/categories/category-form/category-form.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';



export const appRoutes: Route[] = [
    {
        path : '',
        component : ShellComponent,
        children : [
            {
                path: 'dashboard',
                component: DashboardComponent  
            }  ,
            {
                path: 'categories',
                component: CategoriesComponent  
            } ,
            {
                path: 'categories/form',
                component: CategoryFormComponent  
            }   ,
            {
                path: 'categories/form/:id',
                component: CategoryFormComponent  
            }
            ,
            {
                path: 'products',
                component: ProductsListComponent  
            }   ,
            {
                path: 'products/form',
                component: ProductFormComponent  
            },
            {
                path: 'products/form/:id',
                component: ProductFormComponent  
            },
            {
                path: 'users',
                component: UsersListComponent  
            }   ,
            {
                path: 'users/form',
                component: UserFormComponent  
            },
            {
                path: 'users/form/:id',
                component: UserFormComponent  
            },
            {
                path: 'orders',
                component: OrdersListComponent  
            }   ,
            {
                path: 'order/:id',
                component: OrdersDetailsComponent  
            }
        ]
    }


];
