import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserFormComponent } from "./pages/user-form/user-form.component";
import { UsersComponent } from "./pages/users/users.component";

const childRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'new',
    component: UserFormComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {}
