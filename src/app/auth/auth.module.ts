import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { CodeComponent } from './code/code.component';
import { RegisterComponent } from './register/register.component';

import { InputsModule } from '@components/inputs/inputs.module';
import { LoadersModule } from '@components/loaders/loaders.module';

@NgModule({
  declarations: [
    LoginComponent,
    CodeComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputsModule,
    LoadersModule
  ]
})
export class AuthModule { }
