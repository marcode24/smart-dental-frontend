import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './pages/users/users.component';

import { CardsModule } from '@components/cards/cards.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    InputsModule,
    DropdownsModule
  ],
})
export class UsersModule { }
