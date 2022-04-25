import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NewPatientComponent } from "./pages/new-patient/new-patient.component";
import { PatientsComponent } from "./pages/patients/patients.component";

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
  {
    path: 'new',
    component: NewPatientComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PatientsRoutingModule {}