import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesComponent],
    imports: [BrowserModule, HttpClientModule, SharedModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
      ShellComponent,
      SidebarComponent,
      DashboardComponent,
      CategoriesComponent
    ]
})
export class AppModule {}
