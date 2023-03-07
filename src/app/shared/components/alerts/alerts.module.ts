import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TextAlertComponent } from './text-alert/text-alert.component';

@NgModule({
  declarations: [
    TextAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextAlertComponent
  ]
})
export class AlertsModule { }
