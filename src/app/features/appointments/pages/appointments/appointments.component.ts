import { Component, OnInit } from '@angular/core';

import { IChangeStatus } from '@interfaces/appointment.interface';
import { IOptionsSearch } from '@interfaces/options-search.interface';

import { Appointment } from '@models/appointment.model';

import { AppointmentService } from '@services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styles: [
  ]
})
export class AppointmentsComponent implements OnInit {

  public appointments: Appointment[];
  private optionsSearch: IOptionsSearch = {
    limit: 5,
    offset: 0,
    fullname: '',
  }

  private optionAppointment: 'PENDING' | 'CANCELLED' | 'DONE' = 'PENDING';

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(){
    this.appointmentService.getAppointmentsByUser(this.optionAppointment).subscribe(resp => this.appointments = resp);
  }

  changeOptionAppointment(value: any){
    this.optionAppointment = value;
    this.getAppointments();
  }

  changeStatus(change: IChangeStatus) {
    this.appointmentService.changeStatus(change).subscribe(() => this.getAppointments());
  }

  findByFullname(fullname: string) {
    this.optionsSearch.fullname = fullname;
    this.getAppointments();
  }

  changeLimit(limit: number) {
    this.optionsSearch.limit = limit;
    this.getAppointments();
  }

}
