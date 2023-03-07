import { Component, Input } from '@angular/core';

import { ICardIconRight } from '@interfaces/card-icon-right.interface';

@Component({
  selector: 'app-card-icon-right',
  templateUrl: './card-icon-right.component.html',
  styles: [
  ]
})
export class CardIconRightComponent {
  @Input() data: ICardIconRight;
}
