import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
