import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PatientGuard } from "@guards/patient.guard";

import { NewPatientComponent } from "./pages/new-patient/new-patient.component";
import { PatientsComponent } from "./pages/patients/patients.component";
import { RecordComponent } from "./pages/record/record.component";

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
  {
    path: 'new',
    component: NewPatientComponent
  },
  {
    path: 'patient/:patientID/record',
    canActivate: [PatientGuard],
    component: RecordComponent
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