import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./pages/users/users.component";

const childRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
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
