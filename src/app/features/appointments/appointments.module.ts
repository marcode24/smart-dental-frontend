import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TablesModule } from '@components/tables/tables.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { ModalsModule } from '@components/modals/modals.module';
import { ComponentsModule } from './components/components.module';

import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { NewAppointmentComponent } from './pages/new-appointment/new-appointment.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    NewAppointmentComponent
  ],
  imports: [
    CommonModule,
    TablesModule,
    InputsModule,
    DropdownsModule,
    ModalsModule,
    ComponentsModule,
    RouterModule
  ]
})
export class AppointmentsModule { }
