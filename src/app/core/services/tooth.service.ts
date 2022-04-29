import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { RecordService } from './record.service';

import { Tooth } from '@models/tooth.model';
import Swal from 'sweetalert2';
import { IUpdateTooth } from '@interfaces/tooth.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ToothService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private readonly recordService: RecordService
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

  getTeeth(patiendId: number | undefined): Observable<Tooth[]> {
    const url = `${base_url}/teeth/patient/${patiendId}`;
    return this.http.get<Tooth[]>(url, this.headers);
  }

  create(tooth: Tooth) {
    const url = `${base_url}/teeth`;
    this.http.post(url, tooth, this.headers).subscribe({
      next: () => {
        Swal.fire('Servicio agregado correctamente', '', 'success');
        this.recordService.changedRecordsHome.emit(true);
      },
      error: () => {
        Swal.fire('Ocurrio un error intentalo de nuevo', '', 'error');
      }
    })
  }

  update(toothId: number, data: IUpdateTooth) {
    const url = `${base_url}/teeth/${toothId}`;
    this.http.patch(url, data, this.headers).subscribe(resp => {
      Swal.fire('Diente actualizado correctamente', '', 'success');
      this.recordService.changedRecordsHome.emit(true);
    })
  }

}
