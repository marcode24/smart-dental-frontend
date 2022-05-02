import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateAppointment } from '@interfaces/appointment.interface';

import { Appointment } from '@models/appointment.model';

import { AppointmentService } from '@services/appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styles: [
  ]
})
export class NewAppointmentComponent implements OnInit {

  public appointments: Appointment[];
  public dateSelected: string;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  findAppointments(date: string) {
    this.dateSelected = date.split('-').reverse().join('/');
    this.appointmentService.getAppointmentsByUser('PENDING', date).subscribe(resp => this.appointments = resp);
  }

  createAppointment(data: ICreateAppointment) {
    this.appointmentService.create(data).subscribe(resp => {
      if(resp) {
        Swal.fire('Cita programada correctamente', '', 'success');
        this.router.navigate(['/appointments']);
      } else {
        Swal.fire('Ocurrio un error', 'intentelo de nuevo', 'error');
      }
    });
  }

}
