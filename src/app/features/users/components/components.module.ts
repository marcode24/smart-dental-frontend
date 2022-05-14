import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { FormGeneralInfoComponent } from './form-general-info/form-general-info.component';
import { FormAccountComponent } from './form-account/form-account.component';

@NgModule({
  declarations: [
    FormGeneralInfoComponent,
    CardDetailComponent,
    FormAccountComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FormGeneralInfoComponent,
    CardDetailComponent,
    FormAccountComponent
  ]
})
export class ComponentsModule { }
