import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './pages/users/users.component';

import { CardsModule } from '@components/cards/cards.module';

import { InputsModule } from 'app/shared/components/inputs/inputs.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    InputsModule
  ],
})
export class UsersModule { }
