import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientFormComponent } from './patient-form/patient-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PatientFormComponent
  ]
})
export class ComponentsModule { }
