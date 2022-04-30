import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownPageListComponent } from './dropdown-page-list/dropdown-page-list.component';
import { DropdownAppointmentsComponent } from './dropdown-appointments/dropdown-appointments.component';

@NgModule({
  declarations: [
    DropdownPageListComponent,
    DropdownAppointmentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownPageListComponent,
    DropdownAppointmentsComponent
  ]
})
export class DropdownsModule { }
