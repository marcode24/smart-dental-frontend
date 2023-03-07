import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardsModule } from '@components/cards/cards.module';
import { FormsComponentsModule } from '@components/forms/forms-components.module';
import { LoadersModule } from '@components/loaders/loaders.module';

import { CodeComponent } from './pages/code/code.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CodeComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    FormsComponentsModule,
    LoadersModule
  ]
})
export class SettingsModule { }
