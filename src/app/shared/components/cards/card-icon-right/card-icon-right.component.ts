import { Component, Input, OnInit } from '@angular/core';
import { ICardIconRight } from '@interfaces/card-icon-right.interface';

@Component({
  selector: 'app-card-icon-right',
  templateUrl: './card-icon-right.component.html',
  styles: [
  ]
})
export class CardIconRightComponent implements OnInit {
  @Input() data: ICardIconRight;

  constructor() { }

  ngOnInit(): void {
  }

}
