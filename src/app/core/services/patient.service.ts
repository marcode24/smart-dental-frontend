import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

import { IOptionsSearch } from '@interfaces/options-search.interface';
import { IResponsePatient } from '@interfaces/response.interface';

import { Patient } from '@models/patient.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public patientTemp: Patient;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
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

  getPatients(options: IOptionsSearch): Observable<IResponsePatient> {
    const { fullname, limit, offset} = options;
    const url = `${base_url}/patients?name=${fullname || ''}&limit=${limit}&offset=${offset}`;
    console.log('entro a all');
    return this.http.get<IResponsePatient>(url, this.headers);
  }

  getPatientsByUser(options: IOptionsSearch, userId: number) {
    const { fullname, limit, offset} = options;
    const url = `${base_url}/patients/${userId}?name=${fullname || ''}&limit=${limit}&offset=${offset}`;
    console.log('entro a by user');
    return this.http.get<IResponsePatient>(url, this.headers);
  }

  createPatient(patient: Patient) {
    const url = `${base_url}/patients`;
    return this.http.post(url, patient, this.headers);
  }

  getPatientByUser(patientId: number): Observable<boolean> {
    const { id_user } = this.authService.userActive;
    const url = `${base_url}/patients/patient/${patientId}/user/${id_user}`;
    return this.http.get(url, this.headers).pipe(map((resp: any) => {
      const { patient }  = resp;
      if(!patient) {
        return false;
      }
      this.patientTemp = patient;
      return true;
    }),
    catchError(e => of(false))
    );
  }

}
