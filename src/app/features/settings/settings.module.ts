import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './pages/profile/profile.component';

import { FormsComponentsModule } from '@components/forms/forms-components.module';
import { CardsModule } from '@components/cards/cards.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    FormsComponentsModule
  ]
})
export class SettingsModule { }
