import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentsComponent } from "./pages/appointments/appointments.component";

const childRoutes: Routes = [
  {
    path: '',
    component: AppointmentsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppointmentsRoutingModule {}
