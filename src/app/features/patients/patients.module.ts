import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewPatientComponent } from './pages/new-patient/new-patient.component';

import { PatientsComponent } from './pages/patients/patients.component';

import { CardsModule } from '@components/cards/cards.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';

import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    PatientsComponent,
    NewPatientComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    CardsModule,
    DropdownsModule,
    ComponentsModule,
    RouterModule
  ]
})
export class PatientsModule { }
