import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertsModule } from '@components/alerts/alerts.module';

import {
  ModalAppointmentComponent
} from './modal-appointment/modal-appointment.component';

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
