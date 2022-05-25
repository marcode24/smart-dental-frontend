import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormGeneralInfoComponent } from './form-general-info/form-general-info.component';

@NgModule({
  declarations: [
    FormGeneralInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormGeneralInfoComponent
  ]
})
export class FormsComponentsModule { }
