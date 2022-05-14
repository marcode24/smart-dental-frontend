import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormGeneralInfoComponent } from './form-general-info/form-general-info.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

@NgModule({
  declarations: [
    FormGeneralInfoComponent,
    CardDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FormGeneralInfoComponent,
    CardDetailComponent
  ]
})
export class ComponentsModule { }
