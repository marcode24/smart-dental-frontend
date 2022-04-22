import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesOfferComponent } from './pages/services-offer/services-offer.component';

import { CardsModule } from '@components/cards/cards.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    ServicesOfferComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    InputsModule,
    DropdownsModule,
    ComponentsModule
  ]
})
export class ServicesOfferModule { }
