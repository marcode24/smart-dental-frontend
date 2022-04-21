import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownPageListComponent } from './dropdown-page-list/dropdown-page-list.component';

@NgModule({
  declarations: [
    DropdownPageListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownPageListComponent
  ]
})
export class DropdownsModule { }
