import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

import { Record } from '@models/record.model';

import { ICreateRecord } from '@interfaces/create-record.interface';

import { StatusRecordService } from '@enums/status-record.enum';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  public changedRecordsHome: EventEmitter<boolean> = new EventEmitter<boolean>();
  public changedRecords: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  createRecord(record: ICreateRecord): void {
    const url = `${base_url}/records`;
    this.http.post(url, record, this.headers).subscribe(resp => {
      Swal.fire('Servicio agregado correctamente', '', 'success');
      this.changedRecordsHome.emit(true);
    });
  }

  changeStatus(recordId: number, status: StatusRecordService): void {
    const url = `${base_url}/records/${recordId}?status=${status}`;
    this.http.patch(url, {}, this.headers).subscribe(resp => {
      if(status === StatusRecordService.CANCEL || status === StatusRecordService.PAID) {
        this.changedRecords.emit(true);
      }
      this.changedRecordsHome.emit(true);
    })
  }


}
