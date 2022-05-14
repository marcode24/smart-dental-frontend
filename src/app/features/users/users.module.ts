import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersComponent } from './pages/users/users.component';

import { CardsModule } from '@components/cards/cards.module';
import { InputsModule } from '@components/inputs/inputs.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationsModule } from '@components/paginations/paginations.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { ComponentsModule } from './components/components.module';

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
    ComponentsModule
  ],
})
export class UsersModule { }
