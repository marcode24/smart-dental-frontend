import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputSearchComponent } from './input-search/input-search.component';
import { InputPasswordComponent } from './input-password/input-password.component';

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
