import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardIconRightComponent } from './card-icon-right/card-icon-right.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

@NgModule({
  declarations: [
    CardIconRightComponent,
    CardDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardIconRightComponent,
    CardDetailComponent
  ],
})
export class CardsModule { }
