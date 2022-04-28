import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { Record } from '@models/record.model';

import { ICreateRecord } from '@interfaces/create-record.interface';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  public newRecord: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  get token(): string {
    return this.cookieService.get('token');
  }

  get code(): string {
    return this.cookieService.get('code');
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getRecords(patientId: number | undefined, filter: 1 | 2): Observable<Record[]> {
    const url = `${base_url}/records/${patientId}?filter=${filter}`;
    return this.http.get<Record[]>(url, this.headers);
  }

  createRecord(record: ICreateRecord): any {
    const url = `${base_url}/records`;
    this.http.post(url, record, this.headers).subscribe(resp => {
      Swal.fire('Servicio agregado correctamente', '', 'success');
      this.newRecord.emit(true);
    });
  }


}
