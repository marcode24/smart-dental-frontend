import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IOptionsSearch } from '@interfaces/options-search.interface';
import { IResponsePatient } from '@interfaces/response.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
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
}
