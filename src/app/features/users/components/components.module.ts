import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormAccountComponent } from './form-account/form-account.component';

import { InputsModule } from '@components/inputs/inputs.module';

@NgModule({
  declarations: [
    FormAccountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule
  ],
  exports: [
    FormAccountComponent
  ]
})
export class ComponentsModule { }
