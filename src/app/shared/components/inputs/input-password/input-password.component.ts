import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styles: [
  ]
})
export class InputPasswordComponent {
  @Output() password: EventEmitter<string> = new EventEmitter();
  @Input() passwordTemp = '';
  private show = false;

  changeShow() {
    this.show = !this.show;
  }

  emitPassword(value: string) {
    this.show = false;
    this.password.emit(value);
  }

  get isShowing(): boolean {
    return this.show;
  }

}
