import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie-service";
import { catchError, map, Observable, of, tap } from "rxjs";

import { User } from "@models/user.model";

import { ILogin } from "@interfaces/login.interface";
import { Router } from "@angular/router";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userActive: User;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
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

  private saveCookies(name: string, value: string) {
    this.cookieService.set(name, value);
  }

  private deleteCookies(name: string) {
    this.cookieService.delete(name);
  }

  login(data: ILogin): Observable<any> {
    const url = `${base_url}/auth/login`;
    return this.http.post(url, data).pipe(tap((resp: any) => {
      this.saveCookies('token', resp.access_token);
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
        city, country, cp, createdAt, date_birth, email, gender, last_name, name,
        phone_number, role, status, street, updatedAt, username, id_user, '', image, code
      );
      this.deleteCookies('token');
      this.saveCookies('token', resp.access_token);
      return true;
    }), catchError(err => of(false)));
  }

  validateCode(code: string): Observable<boolean> {
    const url = `${base_url}/auth/code/${code}`;
    return this.http.get(url, this.headers).pipe(map((resp: any) => {
      if(resp.valid) this.saveCookies('code', code);
      return resp.valid
    }));
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

}
