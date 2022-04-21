import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './pages/users/users.component';

import { CardsModule } from '@components/cards/cards.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    CardsModule
  ],
})
export class UsersModule { }
