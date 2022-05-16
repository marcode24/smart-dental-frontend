import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesOfferComponent } from './pages/services-offer/services-offer.component';

import { AlertsModule } from '@components/alerts/alerts.module';
import { CardsModule } from '@components/cards/cards.module';
import { ComponentsModule } from './components/components.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { PaginationsModule } from '@components/paginations/paginations.module';

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
    AlertsModule
  ]
})
export class ServicesOfferModule { }
