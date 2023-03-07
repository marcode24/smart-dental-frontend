import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeGuard } from '@guards/code.guard';

import { CodeComponent } from './code/code.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'code',
    component: CodeComponent,
  },
  {
    path: 'register',
    canActivate: [CodeGuard],
    canLoad: [CodeGuard],
    component: RegisterComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}