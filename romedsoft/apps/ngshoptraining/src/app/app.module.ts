import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@romedsoft/ui';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@romedsoft/products';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [AppComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule
        , RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
        ,UiModule, AccordionModule,
         BrowserAnimationsModule, 
         ProductsModule, 
         SharedModule,
         HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
