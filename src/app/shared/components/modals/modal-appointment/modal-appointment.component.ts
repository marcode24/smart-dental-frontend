import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Appointment } from '@models/appointment.model';
import { Patient } from '@models/patient.model';

import { AppointmentService } from '@services/appointment.service';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styles: [
  ]
})
export class ModalAppointmentComponent implements OnInit, OnDestroy {

  public appointment: Appointment;
  private changeAppointment: Subscription;
  constructor(private readonly appointmentService: AppointmentService) { }

  ngOnDestroy(): void {
    this.changeAppointment.unsubscribe();
  }

  ngOnInit(): void {
    this.changeAppointment = this.appointmentService.appointmentSelected.subscribe(appointment => {
      this.appointment = appointment;
      console.log(this.appointment);
    });
  }

  get getStatus() {
    const status = this.appointment.status;
    return 'Cita ' + ((status === 'CANCELLED') ? 'cancelada' : (status === 'PENDING') ? 'pendiente': 'realizada');
  }

  get getColorStatus() {
    const status = this.appointment.status;
    return 'text-' + ((status === 'CANCELLED') ? 'danger' : (status === 'PENDING') ? 'primary': 'success');
  }

  get getAddress() {
    const { street, cp, city, country } = this.appointment.patient as Patient;
    const address = `${street}, CP. ${cp} ${city}, ${country}`;
    return address;
  }

}
