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

const routes : Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
]


@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InputTextModule, ButtonModule,FormsModule,ReactiveFormsModule, ToastModule],
    providers: [AuthService],
    declarations: [
      LoginComponent,
      RegistrationComponent
    ],
    exports: [
      LoginComponent,
      RegistrationComponent
    ]
})
export class UsersModule {}
