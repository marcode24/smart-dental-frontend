import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAppointmentsComponent } from './table-appointments/table-appointments.component';

@NgModule({
  declarations: [
    TableAppointmentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableAppointmentsComponent
  ]
})
export class TablesModule { }
