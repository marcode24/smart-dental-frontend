import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PatientsComponent } from "./pages/patients/patients.component";

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
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