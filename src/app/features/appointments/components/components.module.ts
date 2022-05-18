import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { AlertsModule } from '@components/alerts/alerts.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    AppointmentFormComponent,
    AppointmentCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    AlertsModule
  ],
  exports: [
    AppointmentFormComponent,
    AppointmentCardComponent
  ],
})
export class ComponentsModule { }
