import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/core/pipes/pipes.module';

import { AlertsModule } from '@components/alerts/alerts.module';

import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

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
