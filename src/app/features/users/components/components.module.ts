import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormAccountComponent } from './form-account/form-account.component';

@NgModule({
  declarations: [
    FormAccountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormAccountComponent
  ]
})
export class ComponentsModule { }
