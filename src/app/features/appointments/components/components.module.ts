import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppointmentFormComponent,
    AppointmentCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AppointmentFormComponent,
    AppointmentCardComponent
  ],
})
export class ComponentsModule { }
