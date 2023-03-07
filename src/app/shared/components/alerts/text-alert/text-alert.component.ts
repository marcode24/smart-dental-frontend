import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-alert',
  templateUrl: './text-alert.component.html',
  styles: [
  ]
})
export class TextAlertComponent {
  @Input() icon = 'bx-detail';
  @Input() textColor = 'info';
  @Input() text = 'No hay registro';

}
