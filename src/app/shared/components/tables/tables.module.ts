import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '@pipes/pipes.module';

import {
  TableAppointmentsComponent
} from './table-appointments/table-appointments.component';

@NgModule({
  declarations: [
    TableAppointmentsComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    TableAppointmentsComponent
  ]
})
export class TablesModule { }
