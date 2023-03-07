import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppointmentsComponent } from "./pages/appointments/appointments.component";
import {
  NewAppointmentComponent
} from "./pages/new-appointment/new-appointment.component";

const childRoutes: Routes = [
  {
    path: '',
    component: AppointmentsComponent
  },
  {
    path: 'new',
    component: NewAppointmentComponent,
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
