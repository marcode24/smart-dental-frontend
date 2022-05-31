import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersComponent } from './pages/users/users.component';

import { ComponentsModule } from './components/components.module';

import { CardsModule } from '@components/cards/cards.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { FormsComponentsModule } from '@components/forms/forms-components.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { PaginationsModule } from '@components/paginations/paginations.module';
import { LoadersModule } from '@components/loaders/loaders.module';

@NgModule({
  declarations: [
    UserFormComponent,
    UsersComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    CardsModule,
    InputsModule,
    DropdownsModule,
    PaginationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsComponentsModule,
    LoadersModule,
  ],
})
export class UsersModule { }
