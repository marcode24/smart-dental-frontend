import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-statistics',
  templateUrl: './dropdown-statistics.component.html',
  styles: [
  ]
})
export class DropdownStatisticsComponent {

  @Output() type: EventEmitter<string> = new EventEmitter();
  @Output() option: EventEmitter<string> = new EventEmitter();

  changeType(event: any): void {
    const value: string = event.target.value;
    this.type.emit(value);
  }

  changeOption(event: any): void {
    const value: string = event.target.value;
    this.option.emit(value);
  }

}
