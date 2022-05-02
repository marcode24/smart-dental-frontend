import { Component, Input, OnInit } from '@angular/core';

import { Appointment } from '@models/appointment.model';
import { AppointmentService } from '@services/appointment.service';

@Component({
  selector: 'app-table-appointment',
  templateUrl: './table-appointment.component.html',
  styles: [
  ]
})
export class TableAppointmentComponent implements OnInit {

  @Input() appointments: Appointment[];

  constructor(
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit(): void {
    console.log(this.appointments);
  }

  showDetails(appointment: Appointment) {
    this.appointmentService.changeAppointmentSelected(appointment);
  }

}
