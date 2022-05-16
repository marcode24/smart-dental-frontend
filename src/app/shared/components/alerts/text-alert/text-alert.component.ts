import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-alert',
  templateUrl: './text-alert.component.html',
  styles: [
  ]
})
export class TextAlertComponent implements OnInit {

  @Input() icon: string = 'bx-detail';
  @Input() textColor: string = 'info'
  @Input() text: string = 'No hay registro';

  constructor() { }

  ngOnInit(): void {
  }

}
