import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

import { IOptionsSearch } from '@interfaces/options-search.interface';
import { IResponsePatient } from '@interfaces/response.interface';

import { Patient } from '@models/patient.model';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public patientTemp: Patient;
  public patientTempChanged: EventEmitter<Patient> = new EventEmitter();

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

  getPatients(options: IOptionsSearch): Observable<IResponsePatient> {
    const { fullname, limit, offset} = options;
    const url = `${base_url}/patients?name=${fullname || ''}&limit=${limit}&offset=${offset}`;
    return this.http.get<IResponsePatient>(url, this.headers);
  }

  getPatientsByUser(options: IOptionsSearch, userId: number) {
    const { fullname, limit, offset} = options;
    const url = `${base_url}/patients/${userId}?name=${fullname || ''}&limit=${limit}&offset=${offset}`;
    return this.http.get<IResponsePatient>(url, this.headers);
  }

  createPatient(patient: Patient) {
    const url = `${base_url}/patients`;
    return this.http.post(url, patient, this.headers);
  }

  getPatientByUser(patientId: number, fromDetail: boolean = false): Observable<boolean> {
    const { id_user } = this.authService.userActive;
    const isAdmin = this.authService.userActive.role === 'ADMIN';
    const url = `${base_url}/patients/patient/${patientId}/user/${id_user}?isAdmin=${isAdmin}`;
    return this.http.get(url, this.headers).pipe(map((resp: any) => {
      const { patient }  = resp;
      if(!patient) {
        return false;
      }
      this.patientTemp = patient;
      if(fromDetail) {
        this.patientTempChanged.emit(patient);
      }
      return true;
    }),
    catchError(e => of(false))
    );
  }

  updateInfo(patientID: number, familiarID: number, changes: Patient) {
    const url = `${base_url}/patients/${patientID}/${familiarID}`;
    this.http.put<number[]>(url, changes, this.headers).subscribe((resp: number[]) => {
      if(resp[0] === 0 || resp[1] === 0) {
        Swal.fire('Ocurrio un error al actualizar', '', 'error');
      }
    });
  }

  changeStatus(patientID: number, status: boolean): Observable<number[]> {
    const url = `${base_url}/patients/${patientID}`;
    return this.http.patch<number[]>(url, { status }, this.headers);
  }

  changeUser(patientId: number, userId: number): Observable<number[]> {
    const url = `${base_url}/patients/${patientId}/newUser/${userId}`;
    return this.http.patch<number[]>(url, {}, this.headers);
  }

}
