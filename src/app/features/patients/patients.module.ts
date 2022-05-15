import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { RecordComponent } from './pages/record/record.component';
import { PatientsComponent } from './pages/patients/patients.component';

import { ComponentsModule } from './components/components.module';

import { CardsModule } from '@components/cards/cards.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { PaginationsModule } from '@components/paginations/paginations.module';

@NgModule({
  declarations: [
    PatientsComponent,
    NewPatientComponent,
    RecordComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    CardsModule,
    DropdownsModule,
    PaginationsModule,
    ComponentsModule,
    RouterModule
  ]
})
export class PatientsModule { }
