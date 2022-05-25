import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlertsModule } from '@components/alerts/alerts.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { LoadersModule } from '@components/loaders/loaders.module';
import { ModalsModule } from '@components/modals/modals.module';
import { PaginationsModule } from '@components/paginations/paginations.module';
import { TablesModule } from '@components/tables/tables.module';

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
    RouterModule,
    AlertsModule,
    PaginationsModule,
    LoadersModule
  ]
})
export class AppointmentsModule { }
