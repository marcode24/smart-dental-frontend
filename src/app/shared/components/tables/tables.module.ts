import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAppointmentsComponent } from './table-appointments/table-appointments.component';
import { PipesModule } from 'app/shared/pipes/pipes.module';

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
