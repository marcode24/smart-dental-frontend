import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { Record } from '@models/record.model';

import { ICreateRecord, IUpdateRecord } from '@interfaces/create-record.interface';
import { ISearchParamsStatistics } from '@interfaces/options-search.interface';
import { IStatistics, IStatisticsByDate } from '@interfaces/statistics.interface';

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

  getRecords(patientId: number, filter: 1 | 2 | 3): Observable<Record[]> {
    const url = `${base_url}/records/${patientId}?filter=${filter}`;
    return this.http.get<Record[]>(url, this.headers);
  }

  createRecord(record: ICreateRecord): void {
    const url = `${base_url}/records`;
    this.http.post(url, record, this.headers).subscribe(() => {
      Swal.fire('Servicio agregado correctamente', '', 'success');
      this.changedRecordsHome.emit(true);
    });
  }

  changeStatus(recordId: number, status: StatusRecordService): void {
    const url = `${base_url}/records/${recordId}?status=${status}`;
    this.http.patch(url, {}, this.headers).subscribe(() => {
      if(status === StatusRecordService.CANCEL || status === StatusRecordService.PAID) {
        this.changedRecords.emit(true);
      }
      this.changedRecordsHome.emit(true);
    });
  }

  update(recordId: number, data: IUpdateRecord) {
    const url = `${base_url}/records/update/${recordId}`;
    this.http.patch(url, data, this.headers).subscribe(() => {
      this.changedRecordsHome.emit(true);
    });
  }

  getStatistics(limit = 3): Observable<IStatistics[]> {
    const url = `${base_url}/records/statistics?limit=${limit}`;
    return this.http.get<IStatistics[]>(url, this.headers);
  }

  getStatisticsByDate(params: ISearchParamsStatistics): Observable<IStatisticsByDate> {
    const { limit, offset, type, option } = params;
    const url = base_url + '/records/statistics/date?type=' + type + '&option=' + option
      + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<IStatisticsByDate>(url, this.headers);
  }

}
