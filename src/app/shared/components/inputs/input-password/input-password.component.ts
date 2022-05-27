import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styles: [
  ]
})
export class InputPasswordComponent implements OnInit {
  @Output() password: EventEmitter<string> = new EventEmitter();
  @Input() passwordTemp: string = '';
  private show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

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
