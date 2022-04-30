import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-appointments',
  templateUrl: './dropdown-appointments.component.html',
  styles: [
  ]
})
export class DropdownAppointmentsComponent implements OnInit {

  @Output() option: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeLimit(event: any) {
    this.option.emit(event.target.value);
  }

}
