import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { map, Observable } from 'rxjs';

import { Gender } from '@enums/gender.enum';
import { Roles } from '@enums/role.enum';

import { User } from '@models/user.model';

import { IResponseUser } from '@interfaces/response.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

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

  createUser(data: User, role: Roles) {
    data.role = role;
    data.image = (data.gender === 'male') ? Gender.MALE : (data.gender === 'female') ? Gender.FEMALE: Gender.OTHER;
    const url = `${base_url}/users`;
    return this.http.post(url, data, {}).pipe(map((resp: any) => {
      if(resp.status === 400) {
        if(resp.message === 'username already in use') {
          return Swal.fire('Nombre de usuario no esta disponible', '', 'error');
        }
      }
      this.deleteCookies('code');
      this.saveCookies('token', resp.access_token);
      this.router.navigate(['/']);
    }))
  }

  getUsers(limit: number, offset: number, fullname?: string) {
    const url = `${base_url}/users?fullname=${fullname || ''}&limit=${limit}&offset=${offset}`;
    return this.http.get<IResponseUser>(url, this.headers);
  }

  changeStatus(idUser: string | undefined, status: boolean): Observable<number> {
    const url = `${base_url}/users/${idUser}`;
    return this.http.patch<number>(url, { status }, this.headers );
  }

}
