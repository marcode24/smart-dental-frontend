import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertsModule } from '@components/alerts/alerts.module';
import { CardsModule } from '@components/cards/cards.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { LoadersModule } from '@components/loaders/loaders.module';
import { PaginationsModule } from '@components/paginations/paginations.module';

import { ComponentsModule } from './components/components.module';
import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { RecordComponent } from './pages/record/record.component';

@NgModule({
  declarations: [
    PatientsComponent,
    NewPatientComponent,
    RecordComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    CardsModule,
    DropdownsModule,
    PaginationsModule,
    ComponentsModule,
    RouterModule,
    AlertsModule,
    LoadersModule
  ]
})
export class PatientsModule { }
