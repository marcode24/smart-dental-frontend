import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardsModule } from '@components/cards/cards.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { FormsComponentsModule } from '@components/forms/forms-components.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { LoadersModule } from '@components/loaders/loaders.module';
import { PaginationsModule } from '@components/paginations/paginations.module';

import { ComponentsModule } from './components/components.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersComponent } from './pages/users/users.component';

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
