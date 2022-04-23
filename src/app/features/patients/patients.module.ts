import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './pages/patients/patients.component';

import { CardsModule } from '@components/cards/cards.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';

@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    CardsModule,
    DropdownsModule
  ]
})
export class PatientsModule { }
