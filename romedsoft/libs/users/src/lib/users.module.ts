import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastModule } from "primeng/toast";
import { LocalstorageService } from './services/localstorage.service';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes : Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
]


@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InputTextModule, ButtonModule,FormsModule,ReactiveFormsModule, ToastModule],
    providers: [AuthService,LocalstorageService],
    declarations: [
      LoginComponent,
      RegistrationComponent,
      UnauthorizedComponent
    ],
    exports: [
      LoginComponent,
      RegistrationComponent,
      UnauthorizedComponent
    ]
})
export class UsersModule {}
