import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import { Appointment } from '@models/appointment.model';

import { IChangeStatus, ICreateAppointment } from '@interfaces/appointment.interface';
import { IOptionsSearch } from '@interfaces/options-search.interface';
import { IResponseAppointment } from '@interfaces/response.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public appointmentSelected: EventEmitter<Appointment> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getAppointmentsByUser(
    status: 'PENDING' | 'CANCELLED' | 'DONE',
    options?: IOptionsSearch,
    date?: string
  ): Observable<IResponseAppointment> {
    const idUser = this.authService.userActive.id_user;
    let url = `${base_url}/appointments/user/${idUser}?status=${status}`;
    let fullname;
    if(options) {
      let { limit, offset, fullname: f } = options;
      fullname = f;
      url = `${url}&limit=${limit}&offset=${offset}`;
    }
    if(fullname) {
      fullname = fullname.toString().trim();
      url = `${url}&fullname=${fullname}`
    }
    if(date) {
      url = `${url}&date=${date}`
    }
    return this.http.get<IResponseAppointment>(url, this.headers);
  }

  getAppointmentsByPatient(patientId: number): Observable<Appointment[]> {
    const url = `${base_url}/appointments/patient/${patientId}`;
    return this.http.get<Appointment[]>(url, this.headers);
  }

  changeStatus(changes: IChangeStatus) {
    const { id_appointment, status } = changes;
    const url = `${base_url}/appointments/${id_appointment}`;
    return this.http.patch(url, { status }, this.headers);
  }

  changeAppointmentSelected(appoinment: Appointment) {
    this.appointmentSelected.emit(appoinment);
  }

  create(data: ICreateAppointment): Observable<boolean> {
    const newAppointment: ICreateAppointment = {
      ...data,
      id_user: this.authService.userActive.id_user,
    }
    const url = `${base_url}/appointments`;
    return this.http.post<boolean>(url, newAppointment, this.headers);
  }

}
