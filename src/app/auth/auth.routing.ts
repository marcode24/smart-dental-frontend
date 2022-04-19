import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { CodeComponent } from './code/code.component';
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
    component: RegisterComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}