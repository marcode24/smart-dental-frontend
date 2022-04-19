import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    CodeComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AuthModule { }
