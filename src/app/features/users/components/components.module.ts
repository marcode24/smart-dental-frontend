import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputsModule } from '@components/inputs/inputs.module';

import { FormAccountComponent } from './form-account/form-account.component';

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
