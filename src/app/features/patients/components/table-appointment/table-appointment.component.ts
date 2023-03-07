import { Component, Input } from '@angular/core';

import { AppointmentService } from '@services/appointment.service';

import { Appointment } from '@models/appointment.model';

@Component({
  selector: 'app-table-appointment',
  templateUrl: './table-appointment.component.html',
  styles: [
  ]
})
export class TableAppointmentComponent {

  @Input() appointments: Appointment[];

  constructor(
    private appointmentService: AppointmentService,
  ) { }

  showDetails(appointment: Appointment) {
    this.appointmentService.changeAppointmentSelected(appointment);
  }

}
