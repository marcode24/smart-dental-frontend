import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputPasswordComponent } from './input-password/input-password.component';
import { InputSearchComponent } from './input-search/input-search.component';

@NgModule({
  declarations: [
    InputSearchComponent,
    InputPasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputSearchComponent,
    InputPasswordComponent
  ]
})
export class InputsModule { }
