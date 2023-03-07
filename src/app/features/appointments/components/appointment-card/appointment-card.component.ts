import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Appointment } from '@models/appointment.model';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styles: [
  ]
})
export class AppointmentCardComponent implements OnChanges {

  @Input() appointments: Appointment[];

  public appointmentsTemp: Appointment[];

  ngOnChanges(changes: SimpleChanges): void {
    this.appointmentsTemp = changes['appointments'].currentValue;
  }

  buildFullName(appoinment: Appointment) {
    const { patient } = appoinment;
    return `${appoinment.id_patient} - ${patient?.name} ${patient?.last_name}`;
  }

}
