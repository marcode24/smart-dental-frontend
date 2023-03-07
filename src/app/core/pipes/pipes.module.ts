import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomDatePipe } from './custom-date.pipe';

@NgModule({
  declarations: [
    CustomDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatePipe
  ]
})
export class PipesModule { }
