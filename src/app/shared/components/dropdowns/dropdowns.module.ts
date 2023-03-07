import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  DropdownAppointmentsComponent
} from './dropdown-appointments/dropdown-appointments.component';
import {
  DropdownPageListComponent
} from './dropdown-page-list/dropdown-page-list.component';
import {
  DropdownStatisticsComponent
} from './dropdown-statistics/dropdown-statistics.component';

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
