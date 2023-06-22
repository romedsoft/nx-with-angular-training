import { NgModule } from '@angular/core';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
