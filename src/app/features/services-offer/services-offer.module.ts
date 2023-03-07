import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertsModule } from '@components/alerts/alerts.module';
import { CardsModule } from '@components/cards/cards.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { LoadersModule } from '@components/loaders/loaders.module';
import { PaginationsModule } from '@components/paginations/paginations.module';

import { ComponentsModule } from './components/components.module';
import { ServicesOfferComponent } from './pages/services-offer/services-offer.component';

@NgModule({
  declarations: [
    ServicesOfferComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    InputsModule,
    DropdownsModule,
    ComponentsModule,
    PaginationsModule,
    AlertsModule,
    LoadersModule
  ]
})
export class ServicesOfferModule { }
