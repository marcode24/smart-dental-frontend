import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputSearchComponent } from './input-search/input-search.component';

@NgModule({
  declarations: [
    InputSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputSearchComponent
  ]
})
export class InputsModule { }
