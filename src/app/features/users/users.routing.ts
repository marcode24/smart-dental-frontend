import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserDetailComponent } from "./pages/user-detail/user-detail.component";
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
  },
  {
    path: ':userId',
    component: UserDetailComponent,
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
