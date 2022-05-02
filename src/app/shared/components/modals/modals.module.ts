import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAppointmentComponent } from './modal-appointment/modal-appointment.component';



@NgModule({
  declarations: [
    ModalAppointmentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalAppointmentComponent
  ]
})
export class ModalsModule { }
