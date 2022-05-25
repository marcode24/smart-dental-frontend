import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";

import { User } from "@models/user.model";

import { ILogin } from "@interfaces/login.interface";

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


  login(data: ILogin): Observable<any> {
    const url = `${base_url}/auth/login`;
    return this.http.post(url, data).pipe(map((resp: any) => {
      Storage.saveSessionStorage('token', resp.access_token);
    }));
  }

  validateToken(): Observable<boolean> {
    const url = `${base_url}/auth/renew`;
    return this.http.get(url, this.headers).pipe(map((resp: any) => {
      const {
        city, country, cp, code, username, updatedAt, street, role, status, id_user,
        gender, date_birth, phone_number, last_name, email, createdAt, name, image
      } = resp.user as User;
      this.userActive = new User(
        city, country, cp, date_birth, email, gender, last_name, name,
        phone_number, role, status, street, createdAt, username, updatedAt, id_user, '', image, code
      );
      Storage.deleteSessionStorage('token');
      Storage.saveSessionStorage('token', resp.access_token);
      return true;
    }), catchError(err => of(false)));
  }

  validateCode(code: string): Observable<boolean> {
    const url = `${base_url}/auth/code/${code}`;
    return this.http.get(url, this.headers).pipe(map((resp: any) => {
      if(resp.valid) Storage.saveSessionStorage('code', code);
      return resp.valid
    }));
  }

  logout() {
    Storage.deleteSessionStorage('token');
    this.router.navigate(['/login']);
  }

}
