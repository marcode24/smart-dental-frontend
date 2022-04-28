import { Component, Input, OnInit } from '@angular/core';

import { Tooth } from '@models/tooth.model';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styles: [
  ]
})
export class OdontogramComponent implements OnInit {

  @Input() teeth: Tooth[];

  public up: Array<number> = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  public down: Array<number> = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  constructor() { }

  ngOnInit(): void {
  }

}
