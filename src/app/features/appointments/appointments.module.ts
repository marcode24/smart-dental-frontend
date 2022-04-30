import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './pages/appointments/appointments.component';

import { TablesModule } from '@components/tables/tables.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { ModalsModule } from '@components/modals/modals.module';

@NgModule({
  declarations: [
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    TablesModule,
    InputsModule,
    DropdownsModule,
    ModalsModule
  ]
})
export class AppointmentsModule { }
