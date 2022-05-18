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
  public totalAppointments: number = 0;
  public showPagination: boolean = true;
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
    let fullnameTemp = this.optionsSearch.fullname?.trim();
    this.appointmentService.getAppointmentsByUser(this.optionAppointment, this.optionsSearch).subscribe(({ appointments, total }) => {
      this.showPagination = (fullnameTemp && fullnameTemp.toString().length > 0) ? false : true;
      this.appointments = appointments;
      console.log(this.appointments);
      this.totalAppointments = total;
    });
  }

  changeOptionAppointment(value: any){
    this.optionAppointment = value;
    this.getAppointments();
  }

  changeStatus(change: IChangeStatus) {
    this.appointmentService.changeStatus(change).subscribe(() => this.getAppointments());
  }

  findByFullname(fullname: string) {
    this.showPagination = false;
    this.optionsSearch.fullname = fullname.trim();
    this.getAppointments();
  }

  changeLimit(limit: number) {
    console.log({limit});
    this.optionsSearch.limit = limit;
    this.optionsSearch.offset = 0;
    this.getAppointments();
  }

  changePage(value: number) {
    this.optionsSearch.offset = value;
    this.getAppointments();
  }

  get getLimitPagination(): number {
    return this.optionsSearch.limit;
  }

}
