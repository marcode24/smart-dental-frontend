import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";

import { catchError, map, Observable, of } from "rxjs";

import { User } from "@models/user.model";

import { ILogin } from "@interfaces/login.interface";
import { IResponseLogin } from "@interfaces/response.interface";

import Storage from "@utils/storage.util";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userActive: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get code(): string {
    return sessionStorage.getItem('code') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  login(data: ILogin): Observable<IResponseLogin> {
    const url = `${base_url}/auth/login`;
    return this.http.post<IResponseLogin>(url, data).pipe(map((resp: IResponseLogin) => {
      Storage.saveSessionStorage('token', resp.access_token);
      return resp;
    }));
  }

  validateToken(): Observable<boolean> {
    const url = `${base_url}/auth/renew`;
    return this.http.get<IResponseLogin>(url, this.headers)
      .pipe(map((resp: IResponseLogin) => {
        const {
          city, country, cp, code, username, updatedAt, street, number,
           role, status, id_user,
          gender, birth_date, phone_number, last_name, email, createdAt, name, image
        } = resp.user as User;
        this.userActive = new User(
          city, country, cp, birth_date, email, gender, last_name, name,
          phone_number, role, status, street, number, createdAt, username, updatedAt,
          id_user, '', image, code
        );
        Storage.deleteSessionStorage('token');
        Storage.saveSessionStorage('token', resp.access_token);
        return true;
    }), catchError(() => of(false)));
  }

  validateCode(code: string): Observable<boolean> {
    const url = `${base_url}/auth/code/${code}`;
    return this.http.get<{ valid: boolean }>(url, this.headers).pipe(map(({ valid }) => {
      if(valid) Storage.saveSessionStorage('code', code);
      return valid;
    }));
  }

  logout() {
    Storage.deleteSessionStorage('token');
    this.router.navigate(['/login']);
  }

}
