import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Appointment } from '@models/appointment.model';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styles: [
  ]
})
export class AppointmentCardComponent implements OnInit, OnChanges {

  @Input() appointments: Appointment[];

  public appointmentsTemp: Appointment[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.appointmentsTemp = changes['appointments'].currentValue;
    console.log(this.appointmentsTemp);
  }

  ngOnInit(): void {
  }

  buildFullName(appoinment: Appointment) {
    const { patient } = appoinment;
    return `${appoinment.id_patient} - ${patient?.name} ${patient?.last_name}`;
  }

}
