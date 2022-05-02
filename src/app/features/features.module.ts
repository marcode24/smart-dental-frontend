import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';

import { CoreModule } from '../core/core.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { ServicesOfferModule } from './services-offer/services-offer.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';

@NgModule({
  declarations: [
    FeaturesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    HomeModule,
    UsersModule,
    ServicesOfferModule,
    PatientsModule,
    AppointmentsModule
  ],
  providers: [
  ]
})
export class FeaturesModule { }
