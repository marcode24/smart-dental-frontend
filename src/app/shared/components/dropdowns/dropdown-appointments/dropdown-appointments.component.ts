import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-appointments',
  templateUrl: './dropdown-appointments.component.html',
  styles: [
  ]
})
export class DropdownAppointmentsComponent {

  @Output() option: EventEmitter<string> = new EventEmitter<string>();

  changeLimit(event: any) {
    this.option.emit(event.target.value);
  }

}
