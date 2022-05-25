import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

import { Appointment } from '@models/appointment.model';

import { IChangeStatus } from '@interfaces/appointment.interface';
import { AppointmentService } from '@services/appointment.service';

@Component({
  selector: 'app-table-appointments',
  templateUrl: './table-appointments.component.html',
  styles: [
  ]
})
export class TableAppointmentsComponent implements OnInit {

  @Input() appointments: Appointment[];
  @Output() newStatus: EventEmitter<IChangeStatus> = new EventEmitter();

  constructor(private readonly appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  changeStatus(id_appointment: number | undefined, value: 'DONE' | 'CANCELLED') {
    const changes: IChangeStatus = {
      id_appointment: Number(id_appointment),
      status: value,
    }
    if(value === 'CANCELLED') {
      Swal.fire({
        title: '¿Estás seguro de cancelar esta cita?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cancelar!',
        cancelButtonText: 'Cerrar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Cita cancelada correctamente', 'Avisa a tu paciente de este cambio', 'success');
          this.newStatus.emit(changes)
        }
      })
    } else {
      this.newStatus.emit(changes);
    }
  }

  showDetails(appointment: Appointment) {
    this.appointmentService.changeAppointmentSelected(appointment);
  }

}
