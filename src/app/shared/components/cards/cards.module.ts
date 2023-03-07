import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardIconRightComponent } from './card-icon-right/card-icon-right.component';

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
