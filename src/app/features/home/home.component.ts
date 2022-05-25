import { Component, OnInit } from '@angular/core';

import { AppointmentService } from '@services/appointment.service';

import { IChangeStatus } from '@interfaces/appointment.interface';
import { IOptionsSearch } from '@interfaces/options-search.interface';

import { Appointment } from '@models/appointment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public isLoadingPage: boolean = true;
  public appointments: Appointment[];
  public totalAppointments: number = 0;
  private optionsSearch: IOptionsSearch = { limit: 5, offset: 0 };
  private today: string = new Date().toISOString().split('T')[0];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAppointmentsByUser('PENDING', this.optionsSearch, this.today).subscribe({
      next: ({ appointments, total }) => {
        this.appointments = appointments;
        this.totalAppointments = total;
        console.log({ appointments, total });
      },
      complete: () => {
        this.isLoadingPage = false;
      }
    })
  }

  changeLimit(limit: number) {
    this.optionsSearch.limit = limit;
    this.optionsSearch.offset = 0;
    this.getAppointments();
  }

  changeStatus(change: IChangeStatus) {
    this.optionsSearch.offset = 0;
    this.appointmentService.changeStatus(change).subscribe(() => this.getAppointments());
  }

  get getLimitPagination(): number {
    return this.optionsSearch.limit;
  }

  changePage(value: number) {
    this.optionsSearch.offset = value;
    this.getAppointments();
  }

}
