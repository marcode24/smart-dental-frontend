import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { Tooth } from '@models/tooth.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ToothService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
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

}
