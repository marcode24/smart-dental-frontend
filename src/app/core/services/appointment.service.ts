import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IChangeStatus } from '@interfaces/appointment.interface';
import { Appointment } from '@models/appointment.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public appointmentSelected: EventEmitter<Appointment> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private readonly authService: AuthService
  ) { }

  get token(): string {
    return this.cookieService.get('token');
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getAppointmentsByUser(status: 'PENDING' | 'CANCELLED' | 'DONE'): Observable<Appointment[]> {
    const url = `${base_url}/appointments/user/${this.authService.userActive.id_user}?status=${status}`;
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

}
