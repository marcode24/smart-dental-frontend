import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "@guards/admin.guard";

import { UserDetailComponent } from "./pages/user-detail/user-detail.component";
import { UserFormComponent } from "./pages/user-form/user-form.component";
import { UsersComponent } from "./pages/users/users.component";

const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: UsersComponent,
  },
  {
    path: 'new',
    canActivate: [AdminGuard],
    component: UserFormComponent
  },
  {
    path: ':userId',
    canActivate: [AdminGuard],
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
