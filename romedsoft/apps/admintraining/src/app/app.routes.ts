import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';



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
            }   
        ]
    }


];
