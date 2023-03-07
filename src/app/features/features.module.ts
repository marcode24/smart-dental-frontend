import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentsModule } from './appointments/appointments.module';
import { FeaturesComponent } from './features.component';
import { HomeModule } from './home/home.module';
import { PatientsModule } from './patients/patients.module';
import { ServicesOfferModule } from './services-offer/services-offer.module';
import { SettingsModule } from './settings/settings.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from '../core/core.module';

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
    AppointmentsModule,
    SettingsModule,
    StatisticsModule
  ],
  providers: [
  ]
})
export class FeaturesModule { }
