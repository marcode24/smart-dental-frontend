import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownPageListComponent } from './dropdown-page-list/dropdown-page-list.component';
import { DropdownAppointmentsComponent } from './dropdown-appointments/dropdown-appointments.component';
import { DropdownStatisticsComponent } from './dropdown-statistics/dropdown-statistics.component';

@NgModule({
  declarations: [
    DropdownPageListComponent,
    DropdownAppointmentsComponent,
    DropdownStatisticsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownPageListComponent,
    DropdownAppointmentsComponent,
    DropdownStatisticsComponent
  ]
})
export class DropdownsModule { }
