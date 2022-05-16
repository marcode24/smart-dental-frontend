import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalAppointmentComponent } from './modal-appointment/modal-appointment.component';

import { AlertsModule } from '@components/alerts/alerts.module';

@NgModule({
  declarations: [
    ModalAppointmentComponent
  ],
  imports: [
    CommonModule,
    AlertsModule
  ],
  exports: [
    ModalAppointmentComponent
  ]
})
export class ModalsModule { }
